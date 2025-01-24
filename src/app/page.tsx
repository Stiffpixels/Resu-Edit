import { SelectFileCombo } from "~/components/home/SelectFileCombo";
import { PlaceholderAndEditor } from "./PlaceholderAndEditor";
import { FileUploader} from "./FileUploader";
import { Suspense } from "react";
import { Spinner } from "~/components/ui/spinner";

export default function HomePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
    let file = new Promise<{ name?: string, url?: string }>(resolve => resolve({}));
    try {
        file = searchParams.then(({ id }) => {
            if(id)
            return new Promise((resolve) => {
                setTimeout(() => resolve({ name: "Test", url: `https://3wfx0nos0c.ufs.sh/f/` + id?.toString().replace(" ", "_") }), 2000)
            })
            return new Promise<{ name?: string, url?: string }>(resolve => resolve({}))
        })
    } catch (e) {
        console.log(e)
        file = new Promise(resolve => resolve({}));
    }
    return (
        <>
            <FileSelector />
            <FileUploader />
            <Suspense fallback={<Spinner className="mt-4"/>}>
                <PlaceholderAndEditor fetchedFile={file} />
            </Suspense>
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
