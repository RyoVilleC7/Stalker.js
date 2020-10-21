class Stalker {

    constructor(custumStyle){

        //カスタムスタイルの有無判定
        //存在しなければ空のオブジェクトを代入
        this.style = custumStyle ? custumStyle : {};

        //要素取得
        this.stalker = document.getElementById('MouseStalker');

        
        ///////////////////////////////////////////////////////////////////////////////////////
        

        //スタイル初期値
        this.stalker.style.width = this.style.size ? this.style.size + 'px' : (this.style.size = 16) + 'px';
        this.stalker.style.height = this.style.size ? this.style.size + 'px' : (this.style.size = 16) + 'px';
        this.stalker.style.backgroundColor = this.style.color ? this.style.color : this.style.color = 'red';
        this.stalker.style.border = this.style.border ? this.style.border : this.style.border = '';
        this.stalker.style.borderRadius = '50%';
        this.stalker.style.position = 'fixed';
        this.stalker.style.pointerEvents = 'none';
        this.stalker.style.zIndex = '9999';
        this.stalker.style.opacity = '0';
        this.style.options = 'options' in this.style ? this.style.options : {};
        this.style.options.hoverEffect = 'hoverEffect' in this.style.options ? this.style.options.hoverEffect : this.style.options.hoverEffect = true;
        this.style.options.clickEffect = 'clickEffect' in this.style.options ? this.style.options.clickEffect : this.style.options.clickEffect = 'none';
        this.style.options.frameOut = 'frameOut' in this.style.options ? this.style.options.frameOut : this.style.options.frameOut = true;
        this.style.options.innerContent = 'innerContent' in this.style.options ? this.style.options.innerContent : this.style.options.innerContent = false;
        this.style.options.innerContentStyle = 'innerContentStyle' in this.style.options ? this.style.options.innerContentStyle : {};
        this.style.options.away = 'away' in this.style.options ? this.style.options.away : this.style.options.away = false;
        this.style.options.cursorType = 'cursorType' in this.style.options ? this.style.options.cursorType : this.style.options.cursorType = 'normal';
        this.style.options.cursorStyle = 'cursorStyle' in this.style.options ? this.style.options.cursorStyle : {};


        ///////////////////////////////////////////////////////////////////////////////////////
        

        //マウスストーカーの設定
        this.stalkerPosition = {x: 0, y: 0};
        this.cursorPosition = {x: 0, y: 0};


        //stalker
        this.stalkerStyles = {
            tx: {previous: 0, current: 0, amt: 0.2},
            ty: {previous: 0, current: 0, amt: 0.2},
            size: {previous: this.style.size, current: this.style.size, amt: 0.2},
            opacity: {previous: 0, current: 0, amt: 0.2},
            top: {previous: 0, current: 0, amt: 0.2},
            left: {previous: 0, current: 0, amt: 0.2}
        };


        //cursor
        this.cursorStyles = {
            tx: {previous: 0, current: 0, amt: 0.2},
            ty: {previous: 0, current: 0, amt: 0.2},
            size: {previous: this.style.size, current: this.style.size, amt: 0.2},
            opacity: {previous: 0, current: 0, amt: 0.2},
            top: {previous: 0, current: 0, amt: 0.2},
            left: {previous: 0, current: 0, amt: 0.2}
        };


        ///////////////////////////////////////////////////////////////////////////////////////


        //リサイズ処理（未完成）
        window.addEventListener('resize', () => {
            this.style.options.hiddenViewPort = innerWidth;
        });


        if(this.style.options.hiddenViewPort < innerWidth){


        //クリックアクション
        if(!(this.style.options.clickEffect === 'none')){

            this.effectElem = document.createElement('span');
            this.effectElem.setAttribute('id', 'effectElem');
            this.stalker.appendChild(this.effectElem);
            this.effectElem.style.width = this.style.size + 'px';
            this.effectElem.style.height = this.style.size + 'px';
            this.effectElem.style.backgroundColor = this.style.color;
            this.effectElem.style.borderRadius = '50%';
            this.effectElem.style.position = 'fixed';
            this.effectElem.style.pointerEvents = 'none'
            this.effectElem.style.display = 'inline-block';
            this.effectElem.style.opacity = '0';

            const animationTime = 400;

            document.addEventListener('mousedown', () => {

                //アニメーションの種類を判定
                switch (this.style.options.clickEffect) {
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


        //フレームアウト
        if(this.style.options.frameOut){
            window.addEventListener('mouseout', (e) => {

                this.stalkerStyles['opacity'].current = 0;
                this.cursorStyles['opacity'].current = 0;

            });

            window.addEventListener('mouseover', (e) => {
                
                this.stalkerStyles['opacity'].current = 1;
                this.cursorStyles['opacity'].current = 1;

            });
        };


        //ホバーアクション
        if(this.style.options.hoverEffect){

            const hovElems = document.getElementsByClassName('ms-hov');

            for (let i = 0; i < hovElems.length; i++) {

                //over
                hovElems[i].addEventListener('mouseover', (e)=>{

                        if(this.style.options.away){

                            this.stalkerStyles['top'].current = -40
                            this.stalkerStyles['left'].current = -40

                            //stalker element;
                            this.style.size = this.style.size * 2;
                            this.stalkerStyles['size'].current = this.style.size;
                            this.stalker.style.border = this.style.color + ' ' + '1px solid';
                            this.stalker.style.backgroundColor = 'transparent';
        
                            //effect element
                            effectElem.style.width = this.style.size + 'px';
                            effectElem.style.height = this.style.size + 'px';

                        }else {

                            //stalker element;
                            this.style.size = this.style.size * 2;
                            this.stalkerStyles['size'].current = this.style.size;
                            this.stalker.style.border = this.style.color + ' ' + '1px solid';
                            this.stalker.style.backgroundColor = 'transparent';
        
                            //effect element
                            effectElem.style.width = this.style.size + 'px';
                            effectElem.style.height = this.style.size + 'px';
                        };

                });

                //out
                hovElems[i].addEventListener('mouseout', ()=>{

                        if(this.style.options.away){

                            this.stalkerStyles['top'].current = 0;
                            this.stalkerStyles['left'].current = 0;

                            //stalker element
                            this.style.size = this.style.size / 2;
                            this.stalkerStyles['size'].current = this.style.size;
                            this.stalker.style.border = 'none';
                            this.stalker.style.backgroundColor = this.style.color;
        
                            //effect element
                            effectElem.style.width = this.style.size+ 'px';
                            effectElem.style.height = this.style.size + 'px';

                        }else {

                            //stalker element
                            this.style.size = this.style.size / 2;
                            this.stalkerStyles['size'].current = this.style.size;
                            this.stalker.style.border = 'none';
                            this.stalker.style.backgroundColor = this.style.color;
        
                            //effect element
                            effectElem.style.width = this.style.size+ 'px';
                            effectElem.style.height = this.style.size + 'px';
                        }
                });
            };



            //インナーコンテンツ
            if(this.style.options.innerContent){
                let innerContentElem = document.createElement('span');
                console.log(this.style.options.innerContentStyle)
                innerContentElem.style.color = this.style.options.innerContentStyle.color;
                innerContentElem.style.fontSize = this.style.options.innerContentStyle.size + 'px';
                innerContentElem.style.fontWeight = this.style.options.innerContentStyle.fontWeight;
                innerContentElem.style.letterSpacing = this.style.options.innerContentStyle.letterSpacing + 'px';
                this.stalker.appendChild(innerContentElem)

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

        

        //カーソルタイプ
        switch (this.style.options.cursorType) {
            case 'hidden':
                document.querySelector('html').style.cursor = 'none';
                break;

            case 'circle':
                    document.querySelector('html').style.cursor = 'none';
                    this.cursor = document.createElement('div');
                    this.cursor.style.backgroundColor = this.style.options.cursorStyle.color;
                    this.cursor.style.width = this.style.options.cursorStyle.size + 'px';
                    this.cursor.style.height = this.style.options.cursorStyle.size + 'px';
                    this.cursor.style.borderRadius = '50%';
                    this.cursor.style.position = 'fixed';
                    this.cursor.style.pointerEvents = 'none';
                    this.cursor.style.zIndex = '10000';
                    document.body.insertBefore(this.cursor, this.stalker);
                break;

            case 'normal':
                break;

            default:
                break;
        };



        //カーソル座標を取得
        document.addEventListener('mousemove', e => {
            this.stalkerPosition.x = e.clientX - this.style.size / 2;
            this.stalkerPosition.y = e.clientY - this.style.size / 2;
            this.cursorPosition.x = e.clientX - this.style.options.cursorStyle.size / 2;
            this.cursorPosition.y = e.clientY - this.style.options.cursorStyle.size / 2;
        

            //ストーカーのみ透過
            if(e.target.getAttribute('ms-view') === 'hidden'){
                this.stalkerStyles['opacity'].current = 0;
            }else if(!(e.target.getAttribute('ms-view') === 'hidden')){
                this.stalkerStyles['opacity'].current = 1;
            }
        });

        this.render();
    };

    }


    //レンダリング
    render(){

        const lerp = (a, b, n) => (1 - n) * a + n * b;


        //ストーカーレンダリング/////////////////////////////////////////////
        this.stalkerStyles['tx'].current = this.stalkerPosition.x;
        this.stalkerStyles['ty'].current = this.stalkerPosition.y;

        for (const key in this.stalkerStyles ) {
            this.stalkerStyles[key].previous = lerp(this.stalkerStyles[key].previous, this.stalkerStyles[key].current, this.stalkerStyles[key].amt);
        }

        this.stalker.style.transform = `translateX(${(this.stalkerStyles['tx'].previous)}px) translateY(${this.stalkerStyles['ty'].previous}px)`;
        this.stalker.style.width = `${this.stalkerStyles['size'].previous}px`;
        this.stalker.style.height = `${this.stalkerStyles['size'].previous}px`;
        this.stalker.style.opacity = this.stalkerStyles['opacity'].previous;
        this.stalker.style.top = `${this.stalkerStyles['top'].previous}px`;
        this.stalker.style.left = `${this.stalkerStyles['left'].previous}px`;


        //カーソルレンダリング////////////////////////////////////////////////////
        if(this.style.options.cursorType === 'circle'){

            this.cursorStyles['tx'].current = this.cursorPosition.x;
            this.cursorStyles['ty'].current = this.cursorPosition.y;
    
            for (const key in this.cursorStyles ) {
                this.cursorStyles[key].previous = lerp(this.cursorStyles[key].previous, this.cursorStyles[key].current, this.cursorStyles[key].amt);
            }
    
            this.cursor.style.transform = `translateX(${this.cursorPosition.x}px) translateY(${this.cursorPosition.y}px)`;
            this.cursor.style.opacity = this.cursorStyles['opacity'].previous;
        }

        requestAnimationFrame(() => this.render());

    };
};