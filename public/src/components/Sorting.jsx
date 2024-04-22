import React, { useState } from "react";

export default function Sorting({ posts, setPosts, username }) {
  const [toggleposts, settoggleposts] = useState(false);
  const [toggleuser, settoggleuser] = useState(false);
  const [toggletopic, settoggletopic] = useState(false);

  const OldtoNew = () => {
    const sortedPosts = [...posts].reverse();
    setPosts(sortedPosts);
    settoggleposts(!toggleposts);
  };

  const UserSorting = () => {
    const sortedPosts = [...posts].sort((a, b) => {
      const usernameA = a.username.toLowerCase();
      const usernameB = b.username.toLowerCase();
      return toggleuser
        ? usernameA < usernameB
          ? -1
          : usernameA > usernameB
          ? 1
          : 0
        : usernameA > usernameB
        ? -1
        : usernameA < usernameB
        ? 1
        : 0;
    });
    setPosts(sortedPosts);
    settoggleuser(!toggleuser);
  };

  const TopicSorting = () => {
    const sortedPosts = [...posts].sort((a, b) => {
      const topicA = a.topic.toLowerCase();
      const topicB = b.topic.toLowerCase();
      return toggletopic
        ? topicA < topicB
          ? -1
          : topicA > topicB
          ? 1
          : 0
        : topicA > topicB
        ? -1
        : topicA < topicB
        ? 1
        : 0;
    });
    setPosts(sortedPosts);
    settoggletopic(!toggletopic);
  };

  return (
    <div className="FormContainer grid grid-cols-2 border-8">
      <p className="">Sort by:</p>
      <div className="">
        {toggleposts === false ? (
          <button className="block" onClick={OldtoNew}>
            Oldest to Latest
          </button>
        ) : (
          <button className="block" onClick={OldtoNew}>
            Latest to Oldest
          </button>
        )}
        {!username && (
          <button className="block" onClick={UserSorting}>
            Username
          </button>
        )}
        <button className="block" onClick={TopicSorting}>
          Topic
        </button>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import { Fragment } from "react";
// import { Menu, Transition } from "@headlessui/react";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function Sorting({ posts, setPosts, username }) {
//   const [toggleposts, settoggleposts] = useState(false);
//   const [toggleuser, settoggleuser] = useState(false);
//   const [toggletopic, settoggletopic] = useState(false);

//   const OldtoNew = () => {
//     const sortedPosts = [...posts].reverse();
//     setPosts(sortedPosts);
//     settoggleposts(!toggleposts);
//   };

//   const UserSorting = () => {
//     const sortedPosts = [...posts].sort((a, b) => {
//       const usernameA = a.username.toLowerCase();
//       const usernameB = b.username.toLowerCase();
//       return toggleuser
//         ? usernameA < usernameB
//           ? -1
//           : usernameA > usernameB
//           ? 1
//           : 0
//         : usernameA > usernameB
//         ? -1
//         : usernameA < usernameB
//         ? 1
//         : 0;
//     });
//     setPosts(sortedPosts);
//     settoggleuser(!toggleuser);
//   };

//   const TopicSorting = () => {
//     const sortedPosts = [...posts].sort((a, b) => {
//       const topicA = a.topic.toLowerCase();
//       const topicB = b.topic.toLowerCase();
//       return toggletopic
//         ? topicA < topicB
//           ? -1
//           : topicA > topicB
//           ? 1
//           : 0
//         : topicA > topicB
//         ? -1
//         : topicA < topicB
//         ? 1
//         : 0;
//     });
//     setPosts(sortedPosts);
//     settoggletopic(!toggletopic);
//   };
//   return (
//     <Menu as="div" className="relative inline-block text-left">
//       <div>
//         <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
//           Sort By
//           <ChevronDownIcon
//             className="-mr-1 h-5 w-5 text-gray-400"
//             aria-hidden="true"
//           />
//         </Menu.Button>
//       </div>

//       <Transition
//         as={Fragment}
//         enter="transition ease-out duration-100"
//         enterFrom="transform opacity-0 scale-95"
//         enterTo="transform opacity-100 scale-100"
//         leave="transition ease-in duration-75"
//         leaveFrom="transform opacity-100 scale-100"
//         leaveTo="transform opacity-0 scale-95"
//       >
//         <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//           <div className="py-1">
//             <Menu.Item as="div">
//               {({ active }) =>
//                 toggleposts === false ? (
//                   <a
//                     href="#"
//                     className={classNames(
//                       active ? "bg-gray-100 text-gray-900" : "text-gray-700",
//                       "block px-4 py-2 text-sm"
//                     )}
//                     onClick={OldtoNew}
//                   >
//                     Oldest to Latest
//                   </a>
//                 ) : (
//                   <a
//                     href="#"
//                     className={classNames(
//                       active ? "bg-gray-100 text-gray-900" : "text-gray-700",
//                       "block px-4 py-2 text-sm"
//                     )}
//                     onClick={OldtoNew}
//                   >
//                     Latest to Oldest
//                   </a>
//                 )
//               }
//             </Menu.Item>
//             <Menu.Item as="div">
//               {({ active }) =>
//                 !username && (
//                   <a
//                     href="#"
//                     className={classNames(
//                       active ? "bg-gray-100 text-gray-900" : "text-gray-700",
//                       "block px-4 py-2 text-sm"
//                     )}
//                     onClick={UserSorting}
//                   >
//                     Username
//                   </a>
//                 )
//               }
//             </Menu.Item>
//             <Menu.Item as="div">
//               {({ active }) => (
//                 <a
//                   href="#"
//                   className={classNames(
//                     active ? "bg-gray-100 text-gray-900" : "text-gray-700",
//                     "block px-4 py-2 text-sm"
//                   )}
//                   onClick={TopicSorting}
//                 >
//                   Topic
//                 </a>
//               )}
//             </Menu.Item>
//           </div>
//         </Menu.Items>
//       </Transition>
//     </Menu>
//   );
// }
