import type { ExtraButtonsPlugin } from './ExtraButtonsPlugin';
import type { ExtraButtonsUiPlugin } from './ExtraButtonsUiPlugin';

export type EditorExtraButtonId = string;

export interface EditorExtraButton {
  id: EditorExtraButtonId;
  label: string;
  onClick: (params?: unknown) => void;
  icon?: SvgrComponent;
}

export type ExtraButtonsConfig = {
  items: EditorExtraButton[];
};

declare module '@ckeditor/ckeditor5-core' {
  interface EditorConfig {
    extraButtons?: ExtraButtonsConfig;
  }

  interface PluginsMap {
    [ExtraButtonsPlugin.pluginName]: ExtraButtonsPlugin;
    [ExtraButtonsUiPlugin.pluginName]: ExtraButtonsUiPlugin;
  }
}
