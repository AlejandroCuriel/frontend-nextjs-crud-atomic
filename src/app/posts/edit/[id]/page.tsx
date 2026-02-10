import { EditPostClient } from "./EditPostClient";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditPostPage({ params }: Props) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);

  return <EditPostClient id={id} />;
}
