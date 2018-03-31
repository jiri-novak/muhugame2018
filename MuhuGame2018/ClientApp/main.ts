import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import '@angularclass/hmr'
import 'zone.js/dist/long-stack-trace-zone'

import { AppModule } from './app/app.module'

// tslint:disable-next-line:no-namespace
declare global {
  interface NodeModule {
    hot?: { accept(): void }
  }
}

if (module.hot) {
  module.hot.accept()
}

// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'production') {
  enableProdMode();
}

// Error.stackTraceLimit = Infinity
platformBrowserDynamic().bootstrapModule(AppModule)
