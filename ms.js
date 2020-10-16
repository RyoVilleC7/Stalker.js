class Stalker {
    constructor(custumStyle){

        let style = custumStyle ? custumStyle : {
            options: {
                hoverAction: true,
                clickAction: false,
                fadeOut_In: true,
                custumStyle: true,
            }
        };

        //要素取得
        this.msElem = document.getElementById('MouseStalker');

        //初期値
        this.msElem.style.width = style.size ? style.size + 'px' : (style.size = 16) + 'px';
        this.msElem.style.height = style.size ? style.size + 'px' : (style.size = 16) + 'px';
        this.msElem.style.backgroundColor = style.color ? style.color : 'red';
        this.msElem.style.transition = style.speed ? style.speed + 'ms' : '200ms';
        this.msElem.style.transitionTimingFunction = 'ease-out';
        this.msElem.style.position = 'fixed';

        switch (style.shape) {
            case 'rounded':
                this.msElem.style.borderRadius = '50%';
                break;
            
            case 'square':
                this.msElem.style.borderRadius = '0%';
                break;
        
            default:
                this.msElem.style.borderRadius = '50%';
                break;
        };
        
        if(style.options.clickAction){
            document.addEventListener('mousedown', () => {
                this.msElem.style.width = (style.size*4) + 'px';
                this.msElem.style.height = (style.size*4) + 'px';
            });

            document.addEventListener('mouseup', () => {
                this.msElem.style.width = style.size + 'px';
                this.msElem.style.height = style.size + 'px';
            })
        };

        if(style.options.fadeOut_In){
            document.addEventListener('mouseout', () => {
                this.msElem.style.opacity = '0';
            });

            document.addEventListener('mouseover', () => {
                this.msElem.style.opacity = '1';
            });
        };

        document.addEventListener('mousemove', e => {

            this.msElem.style.left = `${e.clientX - style.size / 2}px`;
            this.msElem.style.top = `${e.clientY - style.size / 2}px`;

            if(style.options.hoverAction){

                if(e.target.classList.contains('ms-hov')){
                    this.msElem.style.width = (style.size*4) + 'px';
                    this.msElem.style.height = (style.size*4) + 'px';
                    this.msElem.style.backgroundColor = 'transparent';
                    this.msElem.style.border = `${style.color} 1px solid`;
                }else {
                    this.msElem.style.width = style.size + 'px';
                    this.msElem.style.height = style.size + 'px';
                    this.msElem.style.backgroundColor = style.color;
                    this.msElem.style.border = 'none';
                };
            };
        });
    };
};