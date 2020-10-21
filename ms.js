class Stalker {

    constructor(custumStyle){

        //カスタムスタイルの有無判定
        //存在しなければ空のオブジェクトを代入
        this.style = custumStyle ? custumStyle : {};

        this.hidden = false;

        //要素取得
        this.msElem = document.getElementById('MouseStalker');

        
        //スタイル初期値
        this.msElem.style.width = this.style.size ? this.style.size + 'px' : (this.style.size = 16) + 'px';
        this.msElem.style.height = this.style.size ? this.style.size + 'px' : (this.style.size = 16) + 'px';
        this.msElem.style.backgroundColor = this.style.color ? this.style.color : this.style.color = 'red';
        this.msElem.style.position = 'fixed';
        this.msElem.style.pointerEvents = 'none';
        this.msElem.style.zIndex = '9999'
        this.style.options = 'options' in this.style ? this.style.options : {};
        this.style.options.hoverAction = 'hoverAction' in this.style.options ? this.style.options.hoverAction : this.style.options.hoverAction = true;
        this.style.options.clickAction = 'clickAction' in this.style.options ? this.style.options.clickAction : this.style.options.clickAction = 'none';
        this.style.options.fadeOut_In = 'fadeOut_In' in this.style.options ? this.style.options.fadeOut_In : this.style.options.fadeOut_In = true;
        this.style.options.innerContent = 'innerContent' in this.style.options ? this.style.options.innerContent : this.style.options.innerContent = false;

        switch (this.style.shape) {
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

        
        this.mouse = {x: 0, y: 0};
        this.renderedStyles = {
            tx: {previous: 0, current: 0, amt: 0.2},
            ty: {previous: 0, current: 0, amt: 0.2},
            size: {previous: this.style.size, current: this.style.size, amt: 0.2},
            opacity: {previous: 1, current: 1, amt: 0.2}
        };

        //クリックアクション
        if(!(this.style.options.clickAction === 'none')){

            this.effectElem = document.createElement('span');
            this.effectElem.setAttribute('id', 'effectElem');
            this.msElem.appendChild(this.effectElem);
            this.effectElem.style.width = this.style.size + 'px';
            this.effectElem.style.height = this.style.size + 'px';
            this.effectElem.style.backgroundColor = this.style.color;
            this.effectElem.style.position = 'fixed';
            this.effectElem.style.pointerEvents = 'none'
            this.effectElem.style.display = 'inline-block';
            this.effectElem.style.opacity = '0';

            switch (this.style.shape) {
                case 'rounded':
                    this.effectElem.style.borderRadius = '50%';
                    break;
                
                case 'square':
                    this.effectElem.style.borderRadius = '0%';
                    break;
            
                default:
                    this.effectElem.style.borderRadius = '50%';
                    break;
            };

            const animationTime = 400;

            document.addEventListener('mousedown', () => {

                //アニメーションの種類を判定
                switch (this.style.options.clickAction) {
                    case 'ripple':
                        
                        this.effectElem.animate([
                            {opacity: '1', transform: 'scale(1)'},
                            {opacity: '0', transform: 'scale(2)'}
                        ], animationTime)

                        setTimeout(() => {
                            this.effectElem.style.opacity = '0';
                        }, animationTime)

                        break;
                
                    default:
                        break;
                }
            });
        };


        //フェードインアウト
        if(this.style.options.fadeOut_In){
            document.addEventListener('mouseout', () => {
                this.msElem.style.opacity = '0';
            });

            document.addEventListener('mouseover', () => {
                this.msElem.style.opacity = '1';
            });
        };

        //ホバーアクション
        if(this.style.options.hoverAction){

            const hovElems = document.getElementsByClassName('ms-hov');

            for (let i = 0; i < hovElems.length; i++) {

                //over
                hovElems[i].addEventListener('mouseover', (e)=>{

                    if(e.target.getAttribute('ms-view') === 'hidden'){
                        this.renderedStyles['opacity'].current = 0;
                        this.hidden = true;
                    }else {

                        //stalker element;
                        this.style.size = this.style.size * 4;
                        this.renderedStyles['size'].current = this.style.size;
                        this.msElem.style.border = this.style.color + ' ' + '1px solid';
                        this.msElem.style.backgroundColor = 'transparent';
    
                        //effect element
                        effectElem.style.width = this.style.size + 'px';
                        effectElem.style.height = this.style.size + 'px';
                    }

                });

                //out
                hovElems[i].addEventListener('mouseout', ()=>{

                    if(this.hidden){

                        this.renderedStyles['opacity'].current = 1;
                        this.hidden = false;

                    }else {

                        //stalker element
                        this.style.size = this.style.size / 4;
                        this.renderedStyles['size'].current = this.style.size;
                        this.msElem.style.border = 'none';
                        this.msElem.style.backgroundColor = this.style.color;
    
                        //effect element
                        effectElem.style.width = this.style.size+ 'px';
                        effectElem.style.height = this.style.size + 'px';
                    }
                });
            };

            if(this.style.options.innerContent){
                let innerContentElem = document.createElement('span');
                innerContentElem.setAttribute('id', 'ms-innerContent');
                this.msElem.appendChild(innerContentElem)


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
            };
        };

        //マウスを動かした際の処理
        document.addEventListener('mousemove', e => {
            this.mouse.x = e.clientX - this.style.size / 2;
            this.mouse.y = e.clientY - this.style.size / 2;
        });

        this.render();
    };
    
    

    render(){
        this.renderedStyles['tx'].current = this.mouse.x;
        this.renderedStyles['ty'].current = this.mouse.y;
        const lerp = (a, b, n) => (1 - n) * a + n * b;

        for (const key in this.renderedStyles ) {
            this.renderedStyles[key].previous = lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].amt);
        }

        this.msElem.style.transform = `translateX(${(this.renderedStyles['tx'].previous)}px) translateY(${this.renderedStyles['ty'].previous}px)`;
        this.msElem.style.width = `${this.renderedStyles['size'].previous}px`;
        this.msElem.style.height = `${this.renderedStyles['size'].previous}px`;
        this.msElem.style.opacity = this.renderedStyles['opacity'].previous;

        requestAnimationFrame(() => this.render());
    };
};