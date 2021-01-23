import ApiPix from "./api.js";
import refs from "./refs.js";
import galleryItem from "../templates/galleryItem.hbs";
import { onOpenModal } from "./modal.js";

const { form, gallery, scroll } = refs;
const imageSearch = new ApiPix();

form.addEventListener("submit", onSearch);
gallery.addEventListener("click", onOpenModal);

function onSearch(e) {
  e.preventDefault();
  imageSearch.searchQuery = e.currentTarget.elements.query.value;
  if (imageSearch.searchQuery === "") return;
 
  imageSearch.resetPage();
  clearContainer();
  observer.observe(scroll);
}

function appendImgMarcup(hits) {
  gallery.insertAdjacentHTML("beforeend", galleryItem(hits));
}

function clearContainer() {
  gallery.innerHTML = "";
}

const onTry = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && imageSearch.query !== "") {
      imageSearch.fetchImg().then((hits) => {
        appendImgMarcup(hits);
             });
    }
  });
};

const observer = new IntersectionObserver(onTry, {
  rootMargin: "100px",
});
