import { PlaceholderAndEditor } from "./PlaceholderAndEditor";
import { ResuForm } from "./ResuForm";

export default async function HomePage() {
    let files: Promise<{ name?: string, url?: string }[]> = new Promise(resolve => resolve([]));
    try {
        files = new Promise((resolve) => {
            setTimeout(() => resolve([{ name: "Test", url: "https://3wfx0nos0c.ufs.sh/f/kjl5fEruWyI8QtIxHvgl3Mn70UZqhLaofQ1XzcwIv62xAOug" }]), 2000)
        })
    } catch (e) {
        console.log(e)
    }
    return (
        <>
            <ResuForm fetchedFiles={files} />
            <PlaceholderAndEditor />
        </>
    );
}

