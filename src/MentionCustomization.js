const customMentionRenderer = (item) => {
    const itemElement = document.createElement( 'span' );

    itemElement.classList.add( 'custom-item' );
    itemElement.id = `mention-list-item-id-${ item.userId }`;
    // itemElement.textContent = `${ item.id } `;

    const usernameElement = document.createElement( 'span' );

    usernameElement.classList.add( 'custom-item-username' );
    usernameElement.textContent = item.name;

    itemElement.appendChild( usernameElement );

    return itemElement;
}

const mentionUserMarker = '@';
const mentionsDefault = [
    { userId: crypto.randomUUID(), name: 'Barney Stinson', link: 'https://www.imdb.com/title/tt0460649/characters/nm0000439' },
    { userId: crypto.randomUUID(), name: 'Lily Aldrin', link: 'https://www.imdb.com/title/tt0460649/characters/nm0004989' },
    { userId: crypto.randomUUID(), name: 'Marry Ann Lewis', link: 'https://www.imdb.com/title/tt0460649/characters/nm1130627' },
    { userId: crypto.randomUUID(), name: 'Marshall Eriksen', link: 'https://www.imdb.com/title/tt0460649/characters/nm0781981' },
    { userId: crypto.randomUUID(), name: 'Robin Scherbatsky', link: 'https://www.imdb.com/title/tt0460649/characters/nm1130627' },
    { userId: crypto.randomUUID(), name: 'Ted Mosby', link: 'https://www.imdb.com/title/tt0460649/characters/nm1102140' }
];

const getFeedItems = (...args) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mentionsDefault.map((user) => ({ ...user, id: `${mentionUserMarker}${user.name}` }))); // fill 'data-mention'
        }, 300)
    })
}

export const mentionConfig = {
    feeds: [
        {
            marker: mentionUserMarker,
            feed: getFeedItems,
            itemRenderer: customMentionRenderer,
            minimumCharacters: 0
        }
    ]
}

// Через const работать не будет1
export function MentionCustomization(editor) {
    console.log(editor)
    // The upcast converter will convert view <a class="mention" href="" data-user-id="">
    // elements to the model 'mention' text attribute.
    editor.conversion.for( 'upcast' ).elementToAttribute( {
        view: {
            name: 'a',
            key: 'data-mention',
            classes: 'mention',
            attributes: {
                href: true,
                'data-user-id': true
            }
        },
        model: {
            key: 'mention',
            value: viewItem => {
                // The mention feature expects that the mention attribute value
                // in the model is a plain object with a set of additional attributes.
                // In order to create a proper object use the toMentionAttribute() helper method:
                const mentionAttribute = editor.plugins.get( 'Mention' ).toMentionAttribute( viewItem, {
                    // Add any other properties that you need.
                    link: viewItem.getAttribute( 'href' ),
                    userId: viewItem.getAttribute( 'data-user-id' )
                } );

                return mentionAttribute;
            }
        },
        converterPriority: 'high'
    } );

    // Downcast the model 'mention' text attribute to a view <a> element.
    editor.conversion.for( 'downcast' ).attributeToElement( {
        model: 'mention',
        view: ( modelAttributeValue, { writer } ) => {
            // Do not convert empty attributes (lack of value means no mention).
            if ( !modelAttributeValue ) {
                return;
            }

            return writer.createAttributeElement( 'a', {
                class: 'mention',
                'data-mention': modelAttributeValue.id,
                'data-user-id': modelAttributeValue.userId,
                'href': modelAttributeValue.link,
            }, {
                // Make mention attribute to be wrapped by other attribute elements.
                priority: 20,
                // Prevent merging mentions together.
                id: modelAttributeValue.uid
            } );
        },
        converterPriority: 'high'
    } );
}
