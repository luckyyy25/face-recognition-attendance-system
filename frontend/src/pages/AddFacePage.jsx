import axios from 'axios';
import { useState } from 'react';
import { FaUser, FaIdBadge, FaUserTie, FaImage } from 'react-icons/fa';

const AddFacePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    role: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('id', formData.id);
    data.append('role', formData.role);
    data.append('image', formData.image);

    try {
      const response = await axios.post('http://localhost:5000/api/employees', data);
      console.log('Success:', response.data);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4">
      <div className="bg-gray-100 dark:bg-gray-900 p-10 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-2xl w-full max-w-lg transition-colors duration-500">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Register New Face
        </h1>

        {isSubmitted ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow-md mb-4 text-center dark:bg-green-200 dark:text-green-900">
            <p className="text-lg font-semibold">Face registered successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">

            <FormInput label="Full Name" name="name" value={formData.name} onChange={handleChange} icon={<FaUser />} />
            <FormInput label="ID Number" name="id" value={formData.id} onChange={handleChange} icon={<FaIdBadge />} />

            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                Role
              </label>
              <div className="flex gap-3">
                  {['Employee', 'Manager', 'Intern'].map((option) => {
                    const roleValue = option.toLowerCase();
                    const isActive = formData.role === roleValue;

                    let bgColor = '';
                    let textColor = 'text-white';
                    if (roleValue === 'employee') bgColor = 'bg-orange-500';
                    if (roleValue === 'manager') bgColor = 'bg-red-600';
                    if (roleValue === 'intern') bgColor = 'bg-gray-800';

                    if (isActive) {
                      bgColor = 'bg-white dark:bg-white text-gray-800 font-bold';
                    }

                    return (
                      <button
                        key={option}
                        type="button"
                        className={`px-6 py-3 rounded-lg border border-transparent font-semibold transition ${bgColor} ${textColor} ${isActive ? 'shadow-md scale-105' : 'opacity-90 hover:opacity-100'}`}
                        onClick={() => setFormData({ ...formData, role: roleValue })}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2" htmlFor="image">
                Upload Photo
              </label>
              <div className="relative">
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  className="w-full py-3 px-4 pl-12 rounded-lg bg-[#f5f5f5] dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
                  <FaImage />
                </div>
              </div>

              {imagePreview && (
                <div className="mt-4">
                  <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg shadow-md" />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-full font-semibold shadow-md hover:bg-indigo-700 transition"
            >
              Register Face
            </button>

          </form>
        )}
      </div>
    </div>
  );
};

const FormInput = ({ label, name, value, onChange, icon }) => (
  <div>
    <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2" htmlFor={name}>
      {label}
    </label>
    <div className="relative">
      <input
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        required
        className="w-full py-3 px-4 pl-12 rounded-lg bg-[#f5f5f5] dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
        {icon}
      </div>
    </div>
  </div>
);

export default AddFacePage;
