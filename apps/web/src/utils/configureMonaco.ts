import loader from '@monaco-editor/loader';

export default function configureMonaco() {
    loader.init().then((monaco) => {
        if (monaco.languages.getLanguages().find((lang) => lang.id === 'dendenmushi')) {
            return;
        }
        monaco.languages.register({ id: 'dendenmushi' });
    
        let keywordsDenDen = ["purururu", "moshimoshi", "denden"];
        let keywordsStandard = ["use", "exec", "var"];
    
        let keywords = keywordsDenDen.concat(keywordsStandard);
    
        monaco.languages.setMonarchTokensProvider('dendenmushi', {
            keywords: keywords,
            tokenizer: {
                root: [
                    [/".*?"/, 'string'],
                    [/\#.*/, 'comment'],
                    [
                        /@?[a-zA-Z][\w$]*/,
                        {
                            cases: {
                                '@keywords': {token:'keyword'},
                                '@default': 'variable'
                            }
                        }
                    ],
                ],
            }
        });

        monaco.editor.defineTheme('dendenmushi', {
            base: 'vs',
            inherit: true,
            colors: {
                
            },
            rules: [
                { token: 'keyword', foreground: 'a7a7a7', fontStyle: 'bold'},
                { token: 'variable', foreground: '9f21a0' },
                { token: 'string', foreground: '34ac80' },
                { token: 'comment', foreground: '9f21a0', fontStyle: 'italic' },
            ]
        });
    });

    
}