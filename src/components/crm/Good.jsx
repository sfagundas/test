import CardContent from "./Main/CardContent";

export default function Good({ content, controlFormData }) {
  return (
    <>
      <CardContent
        content={content}
        controlFormData={controlFormData}
        StatusId={3}
      />
    </>
  );
}
