import { SelectFileCombo } from "~/components/home/SelectFileCombo";
import { PlaceholderAndEditor } from "./PlaceholderAndEditor";
import { ResuForm } from "./ResuForm";

export default async function HomePage({searchParams}:{searchParams:Promise<Record<string, string | string[] | undefined>>}) {
    const {id} =await searchParams;

    let file= new Promise<{name?:string, url?:string}>(resolve => resolve({}));
    try {
        if(id)
        file = new Promise((resolve) => {
            setTimeout(() => resolve({ name: "Test", url: `https://3wfx0nos0c.ufs.sh/f/` + id.toString().replace(" ", "_") }), 2000)
        })
    } catch (e) {
        console.log(e)
        file = new Promise(resolve => resolve({}));
    }
    return (
        <>
            <FileSelector />
            <ResuForm />
            <PlaceholderAndEditor fetchedFile={file} />
        </>
    );
}

async function FileSelector() {
    let files: { name?: string, key?: string }[] = [];
    try {
        files = await new Promise((resolve) => {
            resolve([{ name: "Test", key: "kjl5fEruWyI8QtIxHvgl3Mn70UZqhLaofQ1XzcwIv62xAOug" }])
        })
    } catch (e) {
        console.log(e)
    }

    return (
        <div className="max-w-xl mx-auto my-4">
            <SelectFileCombo files={files} />
        </div>
    )
}
