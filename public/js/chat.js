document.querySelector("#start_chat").addEventListener("click", (event) => {
  const chatHelp = document.getElementById("chat_help");
  chatHelp.style.display = "none";

  const chatInSupport = document.getElementById("chat_in_support");
  chatInSupport.style.display = "block";
  const socket = io();

  const email = document.getElementById("email").value;
  const text = document.getElementById("txt_help").value;

  socket.on("connect", () => {
    const params = {
      email,
      text,
    };
    socket.emit("clientFirstAccess", params, (call, err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(call);
      }
    });
  });
});
