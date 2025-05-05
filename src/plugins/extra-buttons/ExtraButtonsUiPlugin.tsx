import { Plugin } from '@ckeditor/ckeditor5-core';
import { ButtonView } from '@ckeditor/ckeditor5-ui';
import { logError } from '@ckeditor/ckeditor5-utils';


export class ExtraButtonsUiPlugin extends Plugin {
  init() {
    const { editor } = this;
    const buttons = editor.config.get('extraButtons.items');

    buttons?.forEach((button) => {
      editor.ui.componentFactory.add(button.id, (locale) => {
        const view = new ButtonView(locale);
        const { label, icon: Icon, onClick } = button;


        try {
          view.set({
            label,
            tooltip: label,
            icon: Icon,
          });

          view.on('execute', () => {
            onClick();
          });
        } catch (e) {
          logError(String(e));
        }

        return view;
      });
    });
  }

  public static get pluginName() {
    return 'ExtraButtonsUi' as const;
  }
}
