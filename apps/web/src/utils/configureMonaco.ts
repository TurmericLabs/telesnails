import loader from '@monaco-editor/loader';

export default function configureMonaco() {
    loader.init().then((monaco) => {
        if (monaco.languages.getLanguages().find((lang) => lang.id === 'dendenmushi')) {
            return;
        }
        monaco.languages.register({ id: 'dendenmushi' });
    
        let keywordsDenDen = ["purururu", "moshi-moshi", "den-den"];
        let keywordsStandard = ["use", "exec", "var"];
    
        let keywords = keywordsDenDen.concat(keywordsStandard);
    
        monaco.languages.setMonarchTokensProvider('dendenmushi', {
            keywords: keywords,
            tokenizer: {
                root: [
                    [/".*?"/, 'string'],
                    [/\/\/.*/, 'comment'],
                    [/\/\*.*\*\//, 'comment'],
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
                { token: 'keyword', foreground: '0088ff', fontStyle: 'bold'},
                { token: 'variable', foreground: 'ff0000' },
                { token: 'string', foreground: 'ff8800' },
                { token: 'comment', foreground: '00ff00' },
            ]
        });
    });

    
}