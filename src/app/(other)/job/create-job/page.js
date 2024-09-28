import CreateForm from '../../../common/jobPage/createForm';

export default function CreateJob() {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto py-8">
        {/* <div className="container mx-auto py-8"> */}
        <div className="grid grid-cols-4 md:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 md:col-span-9">
            <CreateForm />
          </div>
          <div className="col-span-4 md:col-span-3">

          </div>
        </div>
        {/* */}
      </div>
    </div>
  );
};

