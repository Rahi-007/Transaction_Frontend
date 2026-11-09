import { Skeleton } from "../ui/skeleton";
interface IProps {
    field?: number;
    narration?: boolean;
}

const FormSkeleton = ({ field = 3, narration = false }: IProps) => {
    return (
        <div className="rounded-2xl border bg-white shadow-sm animate-pulse">
            <div className="border-b px-8 py-6">
                <Skeleton className="h-8 w-48" />
            </div>

            <div className="grid gap-x-4 gap-y-6 px-8 py-6 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: field }).map((_, index) => (
                    <div key={index} className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                ))}
                {narration && (
                    <div className="col-span-1 md:col-span-2 xl:col-span-3">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-full rounded-md" />
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-end gap-3 border-t bg-slate-50 px-8 py-5">
                <Skeleton className="h-10 w-24 rounded-md" />
                <Skeleton className="h-10 w-36 rounded-md" />
            </div>
        </div>
    );
};

export default FormSkeleton;