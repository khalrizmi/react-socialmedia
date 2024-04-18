import { useFormik } from "formik";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Comment from "../../types/CommentType";
import { commentService } from "../../services/comment.service";

const AddCommentpage = () => {
  const { id: postId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const validateSchema = Yup.object().shape({
    name: Yup.string().required("This field is required"),
    email: Yup.string().required("This field is required"),
    body: Yup.string().required("This field is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      body: "",
    },
    enableReinitialize: true,
    validationSchema: validateSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const commentData: Comment = {
          postId: Number(postId)!,
          name: values.name!,
          email: values.email!,
          body: values.body!,
        };

        const res = await commentService.addComment(commentData);

        if (res) {
          navigate(`/posts/${postId}`);
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
      <h1 className="font-semibold text-xl">Add Comment</h1>
      <div className="mt-4" />
      <form onSubmit={formik.handleSubmit}>
        <div className="col-span-full">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="name"
              className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <p className="text-sm text-red-500">
              {formik.errors.name ? formik.errors.name : ""}
            </p>
          </div>
        </div>
        <div className="col-span-full">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Email
          </label>
          <div className="mt-2">
            <input
              type="email"
              name="email"
              className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <p className="text-sm text-red-500">
              {formik.errors.email ? formik.errors.email : ""}
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

export default AddCommentpage;
