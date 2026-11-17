class User{
    
    public readonly id: number;
    public name: string;
    public email: string;

    private password: string;
    protected phone: string;
    private _age: number;
    
    private notebooks: NoteBook[] = [];
    
    constructor(
        id: number,
        name: string,
        email: string,
        password: string,
        phone: string,
        age: number
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;

        if (age < 18 || age > 60) {
            throw new Error("Age must be between 18 and 60");
        }

        this._age = age;
    }

    public get age(): number{
        return this._age;
    }

    public set age(value: number) {
        if (value < 18 || value > 60) {
            throw new Error("Age must be between 18 and 60");
        }
        
        this._age = value
    }


    public addNotebook(notebook: NoteBook): void {
        this.notebooks.push(notebook);
    }

    public removeNotebook(title: string): void {
        this.notebooks = this.notebooks.filter(
            notebook => notebook.title !== title
        );
    }

    public getNotebooks(): NoteBook[] {
        return [...this.notebooks];
    }

    public displayInfo(): void {
        console.log("User ID:", this.id);
        console.log("Name:", this.name);
        console.log("Email:", this.email);
        console.log("Phone:", this.phone);
        console.log("Age:", this.age);
    }

}


class Admin extends User{


    constructor(
        id: number,
        name: string,
        email: string,
        password: string,
        phone: string,
        age: number
    ) {
        super(id, name, email, password, phone, age);
    }

    public manageNotes(noteBook: NoteBook, note: Note, action: string) {
        if (action === 'add') {
            noteBook.addNote(note);
            console.log("note add successfully");
        } else if (action === 'remove') {
            noteBook.removeNote(note.id);
            console.log('note removed successfully');
        } else {
            console.log('invalid action');
        }
    }
}

class Note{

    public readonly id: number;
    public title: string;
    
    public content: string;
    public userId: number;

    public author: User;

    constructor(
        id: number,
        title: string,
        content: string,
        author: User
    ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;

        this.userId = author.id;
    }

    public preview(): string{
        const maxLength = 50;

        if (this.content.length <= maxLength) {
            return this.content;
        }

        return this.content.substring(0, maxLength) + '....';
    }
}

class NoteBook{

    private notes: Note[] = [];

    constructor(public title: string) { }
    
    public addNote(note: Note): void{
        
        this.notes.push(note);
    }

    public removeNote(noteId: number): void{
        this.notes = this.notes.filter(
            note => note.id !== noteId
        );
    }

    public getAllNotes(): Note[]{
        return [...this.notes];
    }
}

class Storage<T> {

    private items: T[] = [];

    public addItem(item: T): void {
        this.items.push(item);
    }

    public removeItem(item: T): void {
        this.items = this.items.filter(
            current => current !== item
        );
    }

    public getAllItems(): T[] {
        return [...this.items];
    }
}

