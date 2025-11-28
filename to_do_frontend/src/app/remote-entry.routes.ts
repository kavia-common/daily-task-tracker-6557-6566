import { Routes } from '@angular/router';

// PUBLIC_INTERFACE
/** Routes for loading the 'mf-login' remote's exposed LoginModule via Module Federation at runtime.
 * We use a runtime loader to avoid build-time resolution errors in the host bundle.
 */
export const MF_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => {
      // If not in browser (SSR/prerender), avoid fetching remote and return an empty stub module.
      if (!getWindow() || !getDocument()) {
        return Promise.resolve(createStubModule());
      }
      return loadRemoteModule({
        type: 'module',
        remoteEntry: getRemoteEntryUrl(),
        remoteName: 'mf-login',
        exposedModule: './LoginModule',
      }).then((m: any) => m.LoginModule);
    },
  },
];

/**
 * PUBLIC_INTERFACE
 * Provide the remoteEntry URL. For local dev we use localhost:4201; can be overridden by window.MF_LOGIN_URL.
 */
function getRemoteEntryUrl(): string {
  const w = getWindow() as (typeof globalThis & Record<string, any>) | undefined;
  const fromWindow = w?.['MF_LOGIN_URL'];
  return typeof fromWindow === 'string' && fromWindow.length
    ? fromWindow
    : 'http://localhost:4201/remoteEntry.js';
}

/**
 * PUBLIC_INTERFACE
 * Runtime remote module loader compatible with Webpack Module Federation containers.
 * This avoids static resolution at build time and loads the container in the browser.
 */
async function loadRemoteModule<T = any>(opts: {
  type: 'module';
  remoteEntry: string;
  remoteName: string;
  exposedModule: string; // e.g. './LoginModule'
}): Promise<T> {
  await __loadRemoteEntry__(opts.remoteEntry);

  const w = getWindow() as any;
  if (!w) throw new Error('Window is undefined; remote loading requires browser context.');

  const container = w[opts.remoteName];
  if (!container || !container.get) {
    throw new Error(`Remote container "${opts.remoteName}" not found or invalid.`);
  }
  // Initialize sharing if available
  if (typeof __webpack_init_sharing__ === 'function' && typeof __webpack_share_scopes__ !== 'undefined') {
    await __webpack_init_sharing__('default');
    if (container.init) {
      await container.init(__webpack_share_scopes__.default);
    }
  }
  const factory = await container.get(opts.exposedModule);
  const Module = factory();
  return Module as T;
}

/**
 * PUBLIC_INTERFACE
 * Create a minimal stub Angular module used during SSR/prerender so the route can be rendered without the remote.
 */
function createStubModule(): any {
  // Minimal stub to satisfy loadChildren during SSR/prerender; client will load the real remote.
  return {} as any;
}

function __loadRemoteEntry__(remoteEntry: string): Promise<void> {
  const d = getDocument();
  if (!d) {
    // SSR context – skip script injection
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
    script.onerror = () => reject(new Error(`Failed to load remote entry: ${remoteEntry}`));
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
    const g = Function('return this')() as any; // globalThis fallback
    return typeof g.document !== 'undefined' ? g.document : undefined;
  } catch {
    return undefined;
  }
}

// Ambient declarations so TS/Angular compiler won’t error on webpack sharing globals
declare const __webpack_init_sharing__: (scope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: unknown };
