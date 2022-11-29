const Comments = (props) => {
  
  return (
    <div class="mt-4 rounded-md border border-gray-100 px-4 py-4">
      <div class="pb-4 flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <img
            class="w-7 h-7 rounded-full"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
            alt="Jese Leos avatar"
          />
          <span class="font-medium dark:text-white">{props.firstName} {" "} {props.lastName}</span>
          <span className="font-medium dark:text-white ml-10">
            ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ{props.datePosted}
          </span>
        </div>
      </div>
      <p class="mb-5 font-light text-gray-500 dark:text-gray-400">
        {props.content}
      </p>
    </div>
  );
};

export default Comments;
