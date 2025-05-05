import { Plugin } from '@ckeditor/ckeditor5-core';

import { ExtraButtonsUiPlugin } from './ExtraButtonsUiPlugin';

export class ExtraButtonsPlugin extends Plugin {
  static get requires() {
    return [ExtraButtonsUiPlugin];
  }

  public static get pluginName() {
    return 'ExtraButtons' as const;
  }
}
