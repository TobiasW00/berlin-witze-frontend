export default interface ITag {
    id:string;
    name:string;
    selected:boolean
    description:string
    removeTag(id: string): void;    
    addTag(id: string): void;  
}