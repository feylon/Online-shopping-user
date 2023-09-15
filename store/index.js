import { defineStore } from "pinia";
export let global_funksiya = defineStore("counter",{
    state:() =>{
        return {count :0,
        menus : [true,false,false,false,false],
        auth : false,
       useruid:"6PBzENQ4gWMe36G3vYr1gzqFBGL2",
        
       document:{
           dark :false
       },
       userdata:{

       },
       sale_brands:[],
       prevod:[]
        }
    },
    actions:{
        addone(){
            this.count ++;
        },
        menu_change(i){
            this.menus = [false,false,false,false,false];
            this.menus[i] = true;
        }
    }
});