

class AbstractFigure{
    id ?: number = 0;
    type !: string;
    constructor(id:number=0){
        this.id = id;
    }

    deleteID(){
      delete this.id;
    }
}

class A{

}

export class Box extends AbstractFigure{
    color: string = 'red';
    override type: string = 'box';
    constructor(id:number=0, color:string='red'){
        super(id);
        this.color = color;
    }
}

export class Container extends AbstractFigure{
    items: Array<any> = []
    override type: string = 'container';
    constructor(id:number=0){
        super(id);
    }

    addElement(node:Container, id:number, element:Box|Container){
      
        
        if(node.id === id){
            node.items.push(element);
        }
        
        
        node.items.forEach(item => {
          if(item.type === 'container'){
            this.addElement(item, id, element);
          }
        })
        
    
    }

    changeBoxColor(node:Container, id:number, color:string){
          node.items.forEach(item => {
            if(item.type === 'container'){
              this.changeBoxColor(item, id, color);
            }else if(item.type === 'box'){
                if(item.id === id){
                    item.color = color;
                    return;
                }
            }
          })
    }

    goThroughStorage(node:Container){ 
        
        if(node.items.length === 0){
          return;
        }
        
        
        node.items.forEach(item => {
          if(item.type === 'container'){
            this.goThroughStorage(item);
          }
        })
    }
}


