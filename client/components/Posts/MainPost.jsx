import Comments from "./Comments";

const MainPost = (props) => {
    let arr = [<Comments />, <Comments />, <Comments />];
    return (
        <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mb-11">
            <div class="flex justify-between items-center mb-5 text-gray-500">

                <div class="pt-2 flex justify-between items-center">
                    <div class="flex items-center space-x-4">
                        <img
                            class="w-7 h-7 rounded-full"
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                            alt="Jese Leos avatar"
                        />
                        <span class="font-medium dark:text-white">
                            Prahas Pattem
                        </span>
                    </div>
                </div>


                <span class="text-sm">11/22/2022</span>


            </div>
            <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a href="#">How to quickly deploy a static website</a>
            </h2>
            <p class="mb-5 text-gray-700 dark:text-gray-400">
                Static websites are now used to bootstrap lots of websites
                and are becoming the basis for a variety of tools that even
                influence both web designers and developers influence both
                web designers and developers.
            </p>


            <p className="text-gray-900 dark:text-gray-400"> 1 Comment </p>
            <div>
                <div class="flex items-center space-x-4 mb-4 mt-2">
                    <img
                        class="w-7 h-7 rounded-full"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                        alt="Jese Leos avatar"
                    />
                    <span class=" text-gray-500 dark:text-white">
                        Firstname Lastname
                    </span>
                </div>
                <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="mb-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Add a comment . . ."
                //onChange={feedbackHandler}
                //value={feedback}
                />
            </div>
            <div class="flex-grow border-t border-gray-200"></div>
            {/** Comments show up here */}

            {arr}

        </article>
    );
}

export default MainPost;
