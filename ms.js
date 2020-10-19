class Stalker {

    constructor(custumStyle){

        //カスタムスタイルの有無判定
        //存在しなければ空のオブジェクトを代入
        let style = custumStyle ? custumStyle : {};


        //要素取得
        const msElem = document.getElementById('MouseStalker');

        
        //スタイル初期値
        msElem.style.width = style.size ? style.size + 'px' : (style.size = 16) + 'px';
        msElem.style.height = style.size ? style.size + 'px' : (style.size = 16) + 'px';
        msElem.style.backgroundColor = style.color ? style.color : style.color = 'red';
        msElem.style.transition = style.speed ? style.speed : style.speed = '200ms';
        msElem.style.transitionTimingFunction = 'ease-out';
        msElem.style.position = 'fixed';
        msElem.style.pointerEvents = 'none';
        msElem.style.zIndex = '9999'
        style.options = 'options' in style ? style.options : {};
        style.options.hoverAction = 'hoverAction' in style.options ? style.options.hoverAction : style.options.hoverAction = true;
        style.options.clickAction = 'clickAction' in style.options ? style.options.clickAction : style.options.clickAction = 'none';
        style.options.fadeOut_In = 'fadeOut_In' in style.options ? style.options.fadeOut_In : style.options.fadeOut_In = true;
        style.options.innerContent = 'innerContent' in style.options ? style.options.innerContent : style.options.innerContent = false;

        switch (style.shape) {
            case 'rounded':
                msElem.style.borderRadius = '50%';
                break;
            
            case 'square':
                msElem.style.borderRadius = '0%';
                break;
        
            default:
                msElem.style.borderRadius = '50%';
                break;
        };
        

        //クリックアクション
        if(!(style.options.clickAction === 'none')){

            const effectElem = document.createElement('span');
            effectElem.setAttribute('id', 'effectElem');
            msElem.appendChild(effectElem);
            effectElem.style.width = style.size + 'px';
            effectElem.style.height = style.size + 'px';
            effectElem.style.backgroundColor = style.color;
            effectElem.style.transition = style.speed;
            effectElem.style.transitionTimingFunction = 'ease-out';
            effectElem.style.position = 'fixed';
            effectElem.style.pointerEvents = 'none'
            effectElem.style.display = 'inline-block';
            effectElem.style.opacity = '0';

            switch (style.shape) {
                case 'rounded':
                    effectElem.style.borderRadius = '50%';
                    break;
                
                case 'square':
                    effectElem.style.borderRadius = '0%';
                    break;
            
                default:
                    effectElem.style.borderRadius = '50%';
                    break;
            };
            
            //マウスを動かした際の処理
            document.addEventListener('mousemove', e => {
                effectElem.style.left = `${e.clientX - style.size / 2}px`;
                effectElem.style.top = `${e.clientY - style.size / 2}px`;
            });

            const animationTime = 400;

            document.addEventListener('mousedown', () => {

                //アニメーションの種類を判定
                switch (style.options.clickAction) {
                    case 'ripple':
                        
                        effectElem.animate([
                            {opacity: '1', transform: 'scale(1)'},
                            {opacity: '0', transform: 'scale(2)'}
                        ], animationTime)

                        setTimeout(() => {
                            effectElem.style.opacity = '0';
                        }, animationTime)

                        break;
                
                    default:
                        break;
                }
            });
        };


        //フェードインアウト
        if(style.options.fadeOut_In){
            document.addEventListener('mouseout', () => {
                msElem.style.opacity = '0';
            });

            document.addEventListener('mouseover', () => {
                msElem.style.opacity = '1';
            });
        };

        //ホバーアクション
        if(style.options.hoverAction){

            const hovElems = document.getElementsByClassName('ms-hov');

            for (let i = 0; i < hovElems.length; i++) {

                //over
                hovElems[i].addEventListener('mouseover', ()=>{

                    //stalker element
                    msElem.style.width = (style.size = style.size * 4) + 'px';
                    msElem.style.height = style.size + 'px';
                    msElem.style.border = style.color + ' ' + '2px solid';
                    msElem.style.backgroundColor = 'transparent';

                    //effect element
                    effectElem.style.width = style.size + 'px';
                    effectElem.style.height = style.size + 'px';

                });

                //out
                hovElems[i].addEventListener('mouseout', ()=>{

                    //stalker element
                    msElem.style.width = (style.size = style.size / 4) + 'px';
                    msElem.style.height = style.size + 'px';
                    msElem.style.border = 'none';
                    msElem.style.backgroundColor = style.color;

                    //effect element
                    effectElem.style.width = style.size+ 'px';
                    effectElem.style.height = style.size + 'px';

                });
            };

            if(style.options.innerContent){
                let innerContentElem = document.createElement('span');
                innerContentElem.setAttribute('id', 'ms-innerContent');
                msElem.appendChild(innerContentElem)


                for (let i = 0; i < hovElems.length; i++) {

                    hovElems[i].addEventListener('mouseover', (e) => {
                        if(e.target.getAttribute('ms-data') !== null){
                            innerContentElem.innerText = e.target.getAttribute('ms-data');
                        };
                    });
        
                    hovElems[i].addEventListener('mouseout', () => {
                        innerContentElem.innerText = '';
                    });
                };
            }
        }


        //マウスを動かした際の処理
        document.addEventListener('mousemove', e => {
            msElem.style.left = `${e.clientX - style.size / 2}px`;
            msElem.style.top = `${e.clientY - style.size / 2}px`;
        });
    };
};