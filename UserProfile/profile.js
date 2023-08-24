import {
    auth,
    doc,
    getDoc,
    db,
    query,
    collection,
    where,
    getDocs,
    orderBy,
} from "../firebaseConfig.js";

const bloggerEmailAddress = document.querySelector("#bloggerEmailAddress");
const bloggerFullName = document.querySelector("#bloggerFullName");
const bloggerImage = document.querySelector("#bloggerImage");
const blogPostArea = document.querySelector(".blogPostArea");

let bloggerName;
let bloggerPic;

const urlParams = new URLSearchParams(window.location.search);
const bloggerID = urlParams.get('bloggerID')
console.log(bloggerID);

// ===========>>>>>>>> Show Current User Posts <<<<<<<<=========

async function getAutherData(bloggerID) {
    // console.log(authorUid, "==>>authorUid")

    const docRef = doc(db, "users", bloggerID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // console.log(docSnap.data().userFirstName);
        sendEmail(docSnap.data().userEmail)
        bloggerFullName.innerHTML = `${docSnap.data().userFirstName}${docSnap.data().userSurName}`
        bloggerImage.src = docSnap.data().updatedProfilePic || "../Assets/dummy-image.jpg"
        bloggerName = `${docSnap.data().userFirstName} ${docSnap.data().userSurName}`
        bloggerPic = docSnap.data().updatedProfilePic
        return docSnap.data();
    } else {
        console.log("No such document!");
    }
}

getAutherData(bloggerID)


const showBlogs = async (bloggerID) => {
    try {
        const q = query(collection(db, "myBlogs"), where("blogCreatorId", "==", bloggerID));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());

            const { blogTitle, blogContent, blogCreatorId, currentTime } = doc.data();
            // console.log(postContent);
            console.log(blogCreatorId);
            // console.log(currentTime.toDate());

            const postElement = document.createElement("div");
            postElement.setAttribute("class", "border p-3 mt-2 mb-3 bgBlogPostColor");
            postElement.setAttribute("style", "border-radius: 10px;");
            postElement.setAttribute("id", doc.id);
            const contentOfPost = `<div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
                <img src=${ bloggerPic ||
                "../Assets/dummy-image.jpg"
                } alt="" class="rounded me-3"
                    style="width: 70px; height: 70px" />
                <div class="d-flex">
                    <div class="align-self-end">
                        <h5 class="mb-0 fw-bold" id="blogPostTitle">
                            ${blogTitle}
                        </h5>
                        <p class="mb-0 fw-medium" style="color: #036796;">
                            <span id="blogPostUserName">
                            ${bloggerName} -
                            </span>
                            <span id="blogPostTime">
                            ${moment(currentTime?.toDate()).fromNow()}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-4">
            <p class="wordWrap">
                ${blogContent}
            </p>
        </div>`;

            postElement.innerHTML = contentOfPost;
            // console.log(postElement);
            blogPostArea.appendChild(postElement);
        });
    } catch (error) {
        console.log(error);
    }
}

showBlogs(bloggerID)

const sendEmail = (emailAddress) => {
    var mail = `mailto:${emailAddress}`
    bloggerEmailAddress.href = mail;
    bloggerEmailAddress.innerHTML = emailAddress;
    // bloggerEmailAddress.click()
}

