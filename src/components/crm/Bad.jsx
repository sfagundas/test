import CardContent from "./Main/CardContent";

export default function Bad({ content, controlFormData }) {
  return (
    <>
      <CardContent
        content={content}
        controlFormData={controlFormData}
        StatusId={2}
      />
    </>
  );
}
