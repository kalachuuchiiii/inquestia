import TemplateList from '../../components/template/TemplateList.jsx';

const TemplatesPage = () => {
  return (
    <div className="p-2">
      <div className = "p-2">
        <h1 className="text-3xl font-semibold mb-5">Ready-to-Use Survey Templates</h1>
      <p className="text-base text-gray-600 mb-8">
        Get started quickly with our pre-designed survey templates. Whether you're gathering simple feedback or creating a custom survey, choose a template below to streamline your process and collect insights effortlessly.
      </p>
      </div>
      <TemplateList />
    </div>
  );
};

export default TemplatesPage;