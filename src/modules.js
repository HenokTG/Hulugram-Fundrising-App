import { Store } from "react-notifications-component";

import axios from "axios";
import { axiosInstance } from "./axios";

//Fetch Funds Data
export const fetchFundsData = (
  url,
  funds,
  setTotalCount,
  setNext,
  setFunds,
  setIsLoadingFailed
) => {
  axios
    .get(url)
    .then((res) => {
      setTotalCount(res.data.count);
      setNext(res.data.next);
      setFunds(funds.concat(res.data.results));
      
    })
    .catch(function(error) {
      setIsLoadingFailed(true);
      console.log(error.toJSON());
      console.error("Caution: NO Fund Data is fetched to render!");
    });
};

//Fetch Cause Data
export const fetchCauseData = (
         uuid,
         setCause,
         setIsLoading,
         setIsLoadingFailed
       ) => {
         axiosInstance
           .get(`web/causes/${uuid}/detail/`)
           .then((res) => {
             setCause(res.data);
             setIsLoading(false);
           })
           .catch(function(error) {
             setIsLoadingFailed(true);
             console.log(error.toJSON());
             console.error("Caution: NO Cause Data is fetched to render!");
           });
       };

//onWindowClick Event
window.onclick = function(event) {
  const sModal = document.getElementById("shareModal");
  const pModal = document.getElementById("payModal");
  if (event.target === sModal || event.target === pModal) {
    sModal.style.display = "none";
    pModal.style.display = "none";
  }
};

// Close Modal
export const closeModal = (modalId, setShowOTP) => {
  if (modalId === "payModal") {
    const amountInput = document.getElementById("donate-id");
    const phoneInput = document.getElementById("phone-id");
    const commentInput = document.getElementById("comment-id");
    const OTPInput = document.getElementById("amole-OTP-id");

    OTPInput
      ? (OTPInput.value = "")
      : (amountInput.value = phoneInput.value = commentInput.value = "");

    setShowOTP(false);
  }
  const modal = document.getElementById(modalId);
  modal.style.display = "none";
};

// Handle Window Scroll function
export function handleScroll(causeDetailSection, isScrolling, setIsScrolling) {
  const sectionPosition =
    causeDetailSection.current.previousSibling.offsetTop +
    causeDetailSection.current.previousSibling.offsetHeight;

  const infoSectionElement = document.getElementsByClassName(
    "info-section-side"
  );
  const causeImageElement = document.getElementsByClassName("cause-img");
  const appFlexElement = document.getElementsByClassName("App-flex");
  const causeImagePosition = causeImageElement[0].offsetTop - 16;

  if (window.scrollY <= sectionPosition && isScrolling === true) {
    setIsScrolling(false);
  } else if (window.scrollY > sectionPosition && isScrolling !== true) {
    setIsScrolling(true);
  }

  if (infoSectionElement.length !== 0) {
    if (window.scrollY <= causeImagePosition) {
      infoSectionElement[0].classList.add("info-section-side-relative");
      infoSectionElement[0].classList.remove("info-section-side-fixed");
      infoSectionElement[0].style.top = causeImagePosition;
      appFlexElement[0].style.width = "100%";
    } else if (window.scrollY > causeImagePosition) {
      infoSectionElement[0].classList.add("info-section-side-fixed");
      infoSectionElement[0].classList.remove("info-section-side-relative");
      appFlexElement[0].style.width = "100%";
    }
  }
}

// Fetch Payment Modal
export const fetchPaymentMethod = (setPaymentList) => {
  axiosInstance
    .get("payment-providers/")
    .then((res) => {
      const payList = res.data.sort((a, b) =>
        a.order > b.order
          ? 1
          : a.order === b.order
          ? a.name > b.name
            ? 1
            : -1
          : -1
      );
      setPaymentList(payList);
    })
    .catch(function(error) {
      console.log(error);
      console.error("Caution: NO Payment Method is fetched to render!");
    });
};

//Select Payment Method
export const selectPaymentMethod = (
  event,
  id,
  elemId,
  setPaymentProivderId
) => {
  setPaymentProivderId(id);
  const paymentParentElement = document.getElementsByClassName(
    "pay-method-link"
  )[0].children;

  const selectedMethod = Array.prototype.filter.call(
    paymentParentElement,
    (child) => child.id === elemId
  );
  const unSelectedMethod = Array.prototype.filter.call(
    paymentParentElement,
    (child) => child.id !== elemId
  );
  selectedMethod[0].classList.add("pay-method-selected");
  unSelectedMethod.forEach((el) => el.classList.remove("pay-method-selected"));
};

// Continue Payment
export const continuePayment = (
  e,
  setShowOTP,
  cause,
  paymentProivderId,
  setReturnedUuid
) => {
  e.preventDefault();
  setShowOTP(false);

  const postData = new FormData();
  postData.append("cause", Number(cause.id));
  postData.append("telegram_channel", cause.telegram_channel.telegramID);
  postData.append("payment_provider", paymentProivderId);
  postData.append("amount", e.target.elements.donate.value);
  postData.append("phone_number", e.target.elements.phone.value);
  postData.append("comment", e.target.elements.comment.value);

  console.log("Donation made: ", ...postData);
  const amountInput = document.getElementById("donate-id");
  const phoneInput = document.getElementById("phone-id");
  const commentInput = document.getElementById("comment-id");

  axiosInstance
    .post("web/causes/donate/", postData)
    .then((res) => {
      console.log(res.data);
      amountInput.value = phoneInput.value = commentInput.value = "";

      if (res.data.url) {
        closeModal("payModal", setShowOTP);
        window.open(res.data.url, "_blank").focus();
      }
      if (res.data.uuid) {
        setShowOTP(true);
        setReturnedUuid(res.data.uuid);
      }

    })
    .catch(function(error) {
      console.log(error);
      setShowOTP(false);
      Store.addNotification({
        title: error.response.data.payment_provider?"Payment Declined!":"Amole Payment Declined!",
        message: error.response.data.payment_provider?"Please Choose Payment Provider.":"Mobile number not found on file.",
        type: "danger",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    });
};

//Confirm AMole OTP
export const confirMOTP = (
         e,
         setShowOTP,
         returnedUuid,
         history,
         setConfirmAmole
       ) => {
        setConfirmAmole(true);
         e.preventDefault();
         const postData = new FormData();
         postData.append("otp", e.target.elements.otp.value);
         console.log("OTP: ", ...postData);

         console.log(window.location);
         const amoleCOnfirm =
           window.location.pathname + "thanks-for-your-donation";
         const OTPInput = document.getElementById("amole-OTP-id");

         axios
           .post(
             `https://dev.huluchat.com/hulupay/amole/requests/${returnedUuid}/finalize/`,
             postData
           )
           .then((res) => {
             console.log(res.data);
             closeModal("payModal");
             OTPInput.value = "";
             setConfirmAmole(false);
             setShowOTP(false);
             history(amoleCOnfirm);
           })
           .catch(function(error) {
             console.log(error);
             Store.addNotification({
               title: "Amole Payment Declined!",
               message: error.response.data,
               type: "danger",
               insert: "top",
               container: "top-center",
               animationIn: ["animate__animated", "animate__fadeIn"],
               animationOut: ["animate__animated", "animate__fadeOut"],
               dismiss: {
                 duration: 5000,
                 onScreen: true,
               },
             });
             setConfirmAmole(false);
           });
       };


