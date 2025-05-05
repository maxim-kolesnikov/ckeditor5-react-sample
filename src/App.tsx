import React from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import CakeSvg from './icons/cake.svg';

// NOTE: Use the editor from source (not a build)!
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';

import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Bold, Code, Italic, Strikethrough, Underline, Subscript, Superscript } from '@ckeditor/ckeditor5-basic-styles';
import { CodeBlock } from '@ckeditor/ckeditor5-code-block';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { Heading, HeadingConfig } from '@ckeditor/ckeditor5-heading';
import { Mention } from '@ckeditor/ckeditor5-mention';
import { Link, AutoLink } from '@ckeditor/ckeditor5-link';
import { TodoList, ListProperties } from '@ckeditor/ckeditor5-list';
import { AutoImage, Image, ImageUpload } from '@ckeditor/ckeditor5-image';
import { SelectAll } from '@ckeditor/ckeditor5-select-all';
import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent';
import { Undo } from '@ckeditor/ckeditor5-undo';
import { FontColor, FontBackgroundColor } from '@ckeditor/ckeditor5-font';
import { Highlight } from '@ckeditor/ckeditor5-highlight';
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { Table } from '@ckeditor/ckeditor5-table';
import { SpecialCharacters, SpecialCharactersEssentials } from '@ckeditor/ckeditor5-special-characters';
import { MediaEmbed, AutoMediaEmbed } from '@ckeditor/ckeditor5-media-embed';

import { MentionCustomization, mentionConfig } from './MentionCustomization';
import {ExtraButtonsPlugin} from "./plugins/extra-buttons";

const heading: HeadingConfig = {
  options: [
    {
      model: "paragraph",
      title: "Paragraph",
      class: "ck-heading_paragraph"
    },
    {
      model: "heading1",
      view: "h1",
      title: "Heading 1",
      class: "ck-heading_heading1"
    },
    {
      model: "heading2",
      view: "h2",
      title: "Heading 2",
      class: "ck-heading_heading2"
    },
    {
      model: "heading3",
      view: "h3",
      title: "Heading 3",
      class: "ck-heading_heading3"
    },
    {
      model: "heading4",
      view: "h4",
      title: "Heading 4",
      class: "ck-heading_heading4"
    },
    {
      model: "heading5",
      view: "h5",
      title: "Heading 5",
      class: "ck-heading_heading5"
    },
    {
      model: "heading6",
      view: "h6",
      title: "Heading 6",
      class: "ck-heading_heading6"
    }
  ]
}


const editorExtraButtons = [{
  id: 'extra-btn-id-1',
  label: 'extra-btn',
  icon: CakeSvg,
  onClick: () => console.log('extra-btn-clicked'),
}]

const editorConfiguration = {
  plugins: [
    Alignment,
    CloudServices,
    Essentials, SelectAll,
    Indent, IndentBlock,
    BlockQuote,
    FontColor, FontBackgroundColor,
    Highlight,
    Mention, MentionCustomization,
    Heading, Paragraph,
    Bold, Code, Italic, Strikethrough, Underline, CodeBlock, Subscript, Superscript,
    Link, AutoLink,
    TodoList, ListProperties,
    SimpleUploadAdapter,
    Image, ImageUpload, AutoImage,
    Undo,
    SpecialCharacters,SpecialCharactersEssentials,  Table,
    MediaEmbed, AutoMediaEmbed
  ],
  toolbar: [
    'selectAll', 'uploadImage',
    '|', 'heading',
    '|', 'bold', 'italic', 'strikethrough', 'underline', 'code', 'subscript', 'superscript',
    '|', 'bulletedList', 'numberedList', 'todolist', 'outdent', 'indent', 'undo', 'redo',
    '|', 'fontColor', 'fontBackgroundColor', 'highlight',
    '|', 'alignment',
    '|', 'link', 'blockQuote', 'codeBlock', 'insertTable', 'specialCharacters', 'mediaEmbed',
    '|', ...editorExtraButtons.map((button) => button.id),
  ],
  extraPlugins: [ExtraButtonsPlugin],
  extraButtons: {
    items: editorExtraButtons,
  },
  mention: mentionConfig,
  simpleUpload: {
    uploadUrl: 'http://example.com', // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/image-upload.html
    headers: {
      'X-CSRF-TOKEN': 'CSRF-Token',
      Authorization: 'Bearer <JSON Web Token>'
    }
  },
  image: {
    upload: {
      types: [ 'png', 'jpeg' ]
    }
  },
  heading
  // indentBlock: { // TODO определить отступы
  //     classes: [
  //         'custom-block-indent-a', // First step - smallest indentation.
  //         'custom-block-indent-b',
  //         'custom-block-indent-c'  // Last step - biggest indentation.
  //     ]
  // }
};

const defaultData = `<h1>Hello from CKEditor 5@39.0.1!</h1><h1>Заголовок 1</h1><h2>Заголовок 2</h2><h3>Заголовок 3</h3><h4>Заголовок 4</h4><h5>Заголовок 5</h5><h6>Заголовок 6</h6><p>Параграф с обычным текстом,<br><span style="color:hsl(270,75%,60%);">который</span> <span style="background-color:hsl(0,0%,60%);">можно</span> <mark class="marker-yellow">переносить</mark><br>на новую строку</p><p>Текст с кодом: <code>const baz = 'foo'</code></p><p><strong>Жирный текст </strong><i><strong>Курсивный и жирный текст </strong>Курсивный текст </i><s>Зачеркнутый</s> <u>Подчеркнутый текст</u></p><pre><code class="language-javascript">const customMentionRenderer = (item) =&gt; {
    const itemElement = document.createElement( 'span' );

    itemElement.classList.add( 'custom-item' );
    itemElement.id = \`mention-list-item-id-1\`;
    itemElement.appendChild( usernameElement );
}</code></pre><p><strong>Формулы</strong> <mark class="marker-yellow">x</mark><span style="background-color:hsl(30,75%,60%);"><mark class="marker-yellow"><sub>2</sub></mark></span><mark class="marker-yellow"> = 16</mark> x<sup>2</sup> = 16</p><p><a href="vk.com">Ссылка на VK</a> &nbsp;и кастомные упоминания: <a class="mention" data-mention="@Lily Aldrin" data-user-id="e6e42c9e-8196-4039-95df-5dcd1b556444" href="https://www.imdb.com/title/tt0460649/characters/nm0004989">@Lily Aldrin</a> и <a class="mention" data-mention="@Marry Ann Lewis" data-user-id="6b8f011a-ea6e-4827-b332-f0eb319cc303" href="https://www.imdb.com/title/tt0460649/characters/nm1130627">@Marry Ann Lewis</a>&nbsp;</p><blockquote><p>„Чем выше мы взлетаем, тем меньше мы видим тех, кто не может летать.“ (с) <span style="color:hsl(0,75%,60%);">Стэтхэм</span>.</p></blockquote><ol><li>Пункт</li><li>Пункт</li><li>Пункт</li></ol><ul><li>Пункт 1</li><li>Пункт 2</li><li>Пункт 3</li></ul><ul class="todo-list"><li><label class="todo-list__label"><input type="checkbox" disabled="disabled" checked="checked"><span class="todo-list__label__description">Помыть посуду</span></label></li><li><label class="todo-list__label"><input type="checkbox" disabled="disabled" checked="checked"><span class="todo-list__label__description">Протереть пол</span></label></li><li><label class="todo-list__label"><input type="checkbox" disabled="disabled"><span class="todo-list__label__description">Купить молоко</span></label></li></ul><figure class="table"><table><tbody><tr><td>Наименование</td><td>Количество</td></tr><tr><td>носки</td><td>2</td></tr><tr><td>трусы</td><td>3</td></tr></tbody></table></figure><p>&nbsp;</p><figure class="media"><oembed url="https://www.youtube.com/watch?v=3CBD5JZJJKw"></oembed></figure><p>&nbsp;</p>`

const App = () =>  {
  return (
    <div className="App">
      <h2>Using CKEditor 5 from source in React</h2>
      <CKEditor
        editor={ ClassicEditor }
        config={ editorConfiguration }
        data={defaultData}
        onReady={ editor => {
          // You can store the "editor" and use when it is needed.
          console.log( 'Editor is ready to use!', editor );
        } }
        onChange={ ( event, editor ) => {
          const data = editor.getData();
          console.log( { event, editor, data } );
        } }
        // onBlur={ ( event, editor ) => {
        //     console.log( 'Blur.', editor );
        // } }
        // onFocus={ ( event, editor ) => {
        //     console.log( 'Focus.', editor );
        // } }
      />
    </div>
  );
}

export default App;
