import { Fragment, useContext, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CalendarIcon,
  PaperClipIcon,
  TagIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
const { faker } = require("@faker-js/faker");

interface ICategoryType {
  name: string;
  href: string;
}
interface IAuthor {
  _id:string;
  name:string;
  email:string;

}
interface IAssigned {
  name: string;
  value: string;
  avatar:string;
}
interface Ilabelled {
  name: string;
  value: string;
}
export interface IBlogCard {
  title: string;
  category: ICategoryType;
  description: string;
  date: string;
  datetime: string;
  imageURL: string;
  imageTitle: string;
  readingTime: string;
  image: string;
  assigned:IAssigned;
  postedBy:IAuthor;
  labelled:Ilabelled;
}

export const Create = () => {
  const navigate = useNavigate();

  const assignees = [
    {
      name: "private",
      avatar: faker.image.technics(1234, 2345, true),
      value: "private",
    },
    {
      name: "public",
      avatar: faker.image.technics(1234, 2345, true),
      value: "public",
    },
    // More items...
  ];
  const labels = [
    { name: "Unlabelled", value: "unlabelled" },
    { name: "Engineering", value: "engineering" },
    { name: "Science", value: "science" },
    { name: "Tech", value: "tech" },
    { name: "World News", value: "worldnews" },
    { name: "Finance", value: "finance" },
    { name: "Investment", value: "investment" },
    { name: "Supply Chain", value: "supplychain" },
    { name: "Stories", value: "stories" },
    { name: "Article", value: "article" },
    { name: "Case Study", value: "casestudy" },
    { name: "Video", value: "video" },
    { name: "Music", value: "music" },
    { name: "Art", value: "art" },
    // More items...
  ];
  // const dueDates = [
  //   { name: 'No due date', value: null },
  //   { name: 'Today', value: 'today' },
  //   // More items...
  // ]

  const onSubmitBlog = (evt: any) => {
    evt.preventDefault();
    console.log("submit my blog");

    let myHeaders = new Headers();
    let tok = localStorage.getItem("token");
    myHeaders.append("Authorization", `Bearer ${tok}`);
    myHeaders.append("Content-Type", "application/json");

    if (imageURL.length > 0) {
      let payload = {
        title,
        description,
        imageURL,
        assigned,
        labelled,
        date: new Date(),
        postedBy: "This User",
        imageTitle,
      };

      console.log(payload);

      let raw = JSON.stringify(payload);

      let requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:5000/createPost", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.status == "FAILED") {
            setResponse(result.error);
          }
          if(result.success){
            navigate(`/blog`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onSelectPhoto = (evt:any, thePhotoUrl:any) => {
    evt.preventDefault()
    const data = new FormData();
    data.append("file", thePhotoUrl);
    data.append("upload_preset", "instagram-clone");
    data.append("clound_name", "gelcloudinary");

    fetch(`https://api.cloudinary.com/v1_1/gelcloudinary/upload`, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((imgData) => {
        console.log(imgData);
        setImageURL(imgData.url);
        
      })
      .catch((err) => console.log(err));
  }

  let classNames = (...classes: any) => {
    return classes.filter(Boolean).join(" ");
  };

  const [assigned, setAssigned] = useState(assignees[0]);
  const [labelled, setLabelled] = useState(labels[0]);
  // const [dated, setDated] = useState(dueDates[0])

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  // const [image, setImage] = useState("");
  const [response, setResponse] = useState("");
  
  return (
    <div className="create-container">
      {response?.length > 0 && <p>{response}</p>}
      <form onSubmit={(event) => onSubmitBlog(event)} className="relative">
        <div className="p-[12px] overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
          <div className="flex flex-row gap-4">
            <label
              htmlFor="title"
              className="p-[12px] border-solid border-500-sky border-1 pt-2.5 text-lg font-medium text-gray-500"
            >
              Title:
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-[12px] block w-full pt-2.5 text-lg font-medium focus:outline-none"
            />
          </div>

          <label
            htmlFor="description"
            className="p-[12px] flex w-full border-solid border-300-sky border-1 pt-2.5 text-lg font-medium text-gray-500"
          >
            Body:
          </label>
          <textarea
            rows={2}
            name="description"
            id="description"
            className="p-[12px] block w-full resize-none border rounded placeholder-gray-500 sm:text-sm focus:outline-none"
            placeholder="Write a description..."
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label
            htmlFor="Image Title"
            className="p-[12px] flex w-full border-solid border-300-sky border-1 pt-2.5 text-lg font-medium text-gray-500"
          >
            Image Title:
          </label>
          <input
            type="text"
            name="imageurl"
            id="imageurl"
            className="p-[12px] block w-full resize-none border rounded placeholder-gray-500 sm:text-sm focus:outline-none"
            placeholder="For now place an image url here..."
            required
            value={imageTitle}
            onChange={(e) => setImageTitle(e.target.value)}
          />

          {/* Spacer element to match the height of the toolbar */}
          <div aria-hidden="true">
            <div className="py-2">
              <div className="h-9" />
            </div>
            <div className="h-px" />
            <div className="py-2">
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-px bottom-0">
          {/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}
          <div className="flex flex-nowrap justify-end space-x-2 py-2 px-2 sm:px-3">
            <Listbox
              as="div"
              value={assigned}
              onChange={setAssigned}
              className="flex-shrink-0"
            >
              {({ open }) => (
                <>
                  <Listbox.Label className="sr-only"> Assign </Listbox.Label>
                  <div className="relative">
                    <Listbox.Button className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 py-2 px-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                      {assigned.name === null ? (
                        <UserCircleIcon
                          className="h-5 w-5 flex-shrink-0 text-gray-300 sm:-ml-1"
                          aria-hidden="true"
                        />
                      ) : (
                        <img
                          src={assigned.avatar}
                          alt=""
                          className="h-5 w-5 flex-shrink-0 rounded-full"
                        />
                      )}

                      <span
                        className={classNames(
                          assigned.name === null ? "" : "text-gray-900",
                          "hidden truncate sm:ml-2 sm:block"
                        )}
                      >
                        {assigned.name === null ? "Assign" : assigned.name}
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {assignees.map((assignee, idx) => (
                          <Listbox.Option
                            key={idx}
                            className={({ active }) =>
                              classNames(
                                active ? "bg-gray-100" : "bg-white",
                                "relative cursor-default select-none py-2 px-3"
                              )
                            }
                            value={assignee}
                          >
                            <div className="flex items-center">
                              {assignee.avatar ? (
                                <img
                                  src={assignee.avatar}
                                  alt="avatar"
                                  className="h-5 w-5 flex-shrink-0 rounded-full"
                                />
                              ) : (
                                <UserCircleIcon
                                  className="h-5 w-5 flex-shrink-0 text-gray-400"
                                  aria-hidden="true"
                                />
                              )}

                              <span className="ml-3 block truncate font-medium">
                                {assignee.name}
                              </span>
                            </div>
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>

            <Listbox
              as="div"
              value={labelled}
              onChange={setLabelled}
              className="flex-shrink-0"
            >
              {({ open }) => (
                <>
                  <Listbox.Label className="sr-only">
                    {" "}
                    Add a label{" "}
                  </Listbox.Label>
                  <div className="relative">
                    <Listbox.Button className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 py-2 px-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                      <TagIcon
                        className={classNames(
                          labelled.value === null
                            ? "text-gray-300"
                            : "text-gray-500",
                          "h-5 w-5 flex-shrink-0 sm:-ml-1"
                        )}
                        aria-hidden="true"
                      />
                      <span
                        className={classNames(
                          labelled.value === null ? "" : "text-gray-900",
                          "hidden truncate sm:ml-2 sm:block"
                        )}
                      >
                        {labelled.value === null ? "Label" : labelled.name}
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {labels.map((label, idx) => (
                          <Listbox.Option
                            key={idx}
                            className={({ active }) =>
                              classNames(
                                active ? "bg-gray-100" : "bg-white",
                                "relative cursor-default select-none py-2 px-3"
                              )
                            }
                            value={label}
                          >
                            <div className="flex items-center">
                              <span className="block truncate font-medium">
                                {label.name}
                              </span>
                            </div>
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>

            {/* <Listbox as="div" value={dated} onChange={setDated} className="flex-shrink-0">
            {({ open }) => (
              <>
                <Listbox.Label className="sr-only"> Add a due date </Listbox.Label>
                <div className="relative">
                  <Listbox.Button className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 py-2 px-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                    <CalendarIcon
                      className={classNames(
                        dated.value === null ? 'text-gray-300' : 'text-gray-500',
                        'h-5 w-5 flex-shrink-0 sm:-ml-1'
                      )}
                      aria-hidden="true"
                    />
                    <span
                      className={classNames(
                        dated.value === null ? '' : 'text-gray-900',
                        'hidden truncate sm:ml-2 sm:block'
                      )}
                    >
                      {dated.value === null ? 'Due date' : dated.name}
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {dueDates.map((dueDate) => (
                        <Listbox.Option
                          key={dueDate.value}
                          className={({ active }) =>
                            classNames(
                              active ? 'bg-gray-100' : 'bg-white',
                              'relative cursor-default select-none py-2 px-3'
                            )
                          }
                          value={dueDate}
                        >
                          <div className="flex items-center">
                            <span className="block truncate font-medium">{dueDate.name}</span>
                          </div>
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox> */}
          </div>

          <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
            <div className="flex">
              <input
                type="file"
                onChange={(e: any) => onSelectPhoto(e, e.target.files[0])}
                className="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"
              />
              {/* <PaperClipIcon className="-ml-1 mr-2 h-5 w-5 group-hover:text-gray-500" aria-hidden="true" /> */}
              {/* <span className="text-sm italic text-gray-500 group-hover:text-gray-600">Attach a file</span> */}
            </div>
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
