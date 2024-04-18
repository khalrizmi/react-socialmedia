import { useFormik } from "formik";
import {useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../../types/PostType";
import * as Yup from "yup";
import { postService } from "../../services/post.service";

const AddPostPage = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const validateSchema = Yup.object().shape({
    title: Yup.string().required("This field is required"),
    body: Yup.string().required("This field is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    enableReinitialize: true,
    validationSchema: validateSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const postData: Post = {
          userId: Number(userId),
          title: values.title!,
          body: values.body!,
        };
        const res = await postService.addPost(postData);
        if (res) {
          navigate(`/users/${userId}/posts`);
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
  });

  if (isLoading) return "Loading...";

  return (
    <div>
      <h1 className="font-semibold text-xl">Add Post</h1>
      <div className="mt-4" />
      <form onSubmit={formik.handleSubmit}>
        <div className="col-span-full">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Title
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="title"
              className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            <p className="text-sm text-red-500">
              {formik.errors.title ? formik.errors.title : ""}
            </p>
          </div>
        </div>
        <div className="col-span-full mt-4">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Body
          </label>
          <div className="mt-2">
            <textarea
              name="body"
              rows={3}
              className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={formik.handleChange}
              defaultValue={formik.values.body}
            />
            <p className="text-sm text-red-500">
              {formik.errors.body ? formik.errors.body : ""}
            </p>
          </div>

          <button
            type={"submit"}
            className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPostPage;
