import { Routes } from '@angular/router';

// PUBLIC_INTERFACE
/** Routes for loading the mf-login remote via Module Federation at runtime.
 * Uses a dynamic import helper to avoid build-time resolution failures.
 * Ensures access only in the browser to prevent SSR/linter errors.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: (getWindow() as (typeof globalThis & Record<string, any>) | undefined)?.['MF_LOGIN_URL'] || 'http://localhost:4201/remoteEntry.js',
        remoteName: 'mf-login',
        exposedModule: './LoginModule',
      }).then((m: any) => m.LoginComponent || m.default || m.LoginModule),
  },
];

// PUBLIC_INTERFACE
/** Lightweight helper that uses native dynamic import to fetch the remoteEntry and then resolves the exposed module.
 * Note: For dev/demo usage; for production use, integrate @angular-architects/module-federation runtime helpers.
 */
async function loadRemoteModule<T = any>(opts: {
  type: 'module';
  remoteEntry: string;
  remoteName: string;
  exposedModule: string;
}): Promise<T> {
  await __loadRemoteEntry__(opts.remoteEntry);

  const w = getWindow();
  if (!w) {
    throw new Error('Remote loading attempted outside of browser context.');
  }
  const container = (w as any)[opts.remoteName];
  if (!container || !container.get) {
    throw new Error(`Remote container ${opts.remoteName} not found or invalid.`);
  }
  // Webpack sharing API is not available in this environment; attempt to call exposed module factory directly.
  // Many remoteEntry implementations assign the module factory under container.get(exposed).
  const getFactory = await container.get(opts.exposedModule);
  const Module = getFactory();
  return Module as T;
}

function __loadRemoteEntry__(remoteEntry: string): Promise<void> {
  const d = getDocument();
  if (!d) {
    // SSR - skip loading remote entry; route shouldn't be activated server-side
    return Promise.resolve();
  }
  return new Promise<void>((resolve, reject) => {
    const existing = d.querySelector(`script[src="${remoteEntry}"]`);
    if (existing) {
      resolve();
      return;
    }
    const script = d.createElement('script');
    script.src = remoteEntry;
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error(`Failed to load remote entry: ${remoteEntry}`));
    d.head.appendChild(script);
  });
}

function getWindow(): (typeof globalThis) | undefined {
  try {
    // eslint-disable-next-line no-undef
    return typeof window !== 'undefined' ? window : undefined;
  } catch {
    return undefined;
  }
}

function getDocument(): any | undefined {
  try {
    // eslint-disable-next-line no-undef
    return typeof document !== 'undefined' ? document : undefined;
  } catch {
    return undefined;
  }
}
