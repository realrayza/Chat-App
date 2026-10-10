import { useState } from "react";
import { PagesAndSide } from "../Layout/PagesAndSide";
import { useContact } from "../hooks/useContact";
import { useChatContext } from "../hooks/useChatContext";
import { ContactDisplay } from "../Components/ContactDisplay";

export const Contacts = () => {
  const [visible, setVisible] = useState(false);
  const chats = useChatContext();
  const { setReceiverId,receiverId } = chats;
  const context = useContact();
  const { contacts, error, setContactId, setContactName, addContact } = context;
  

  return (
    <PagesAndSide>
      <div className="page pageMd mgLeft25 vw100 vh100 flexColumn hideOverflowXMd">
        <div className="addContact">
          <button
            className="noBorder pad10 bigMidFont bigMidFontMd bold700 fontColorSec radius5 font"
            onClick={() => setVisible(!visible)}>
            Add Contact +
          </button>
        </div>
        {error && (
          <h2 className="error  fontColorMain mgTop15 font pad10 bold500 solidBorder bdWidth2">{error}</h2>
        )}
        <div className={`${visible ? "modalVisible" : "modalHide"} mgTop20`}>
          <form className="flexRow gap15 flexColumnMd " onSubmit={addContact}>
            <input
              className="midFont midFontMd pad5 font fontColorSec radius5 noBorder contactFormInputMd"
              type="text"
              placeholder="Contact Name..."
              onChange={(e) => setContactName(e.target.value)}
            />
            <input
              className="midFont midFontMd pad5 font fontColorSec radius5 noBorder contactFormInputMd "
              type="text"
              placeholder="Contact NkataId..."
              onChange={(e) => setContactId(e.target.value)}
            />
            <button
              type="submit"
              className="midFont midFontMd padTop5 padBottom5 padRight10 padLeft10 bold700 font fontColorSec radius5 noBorder contactFormInputMd">
              Save
            </button>
          </form>
        </div>
        <div className="contacts mgTop20 autoOverflowY hideOverflowY scrollOverflowY">
          <h2 className="fontColorMain font vb100 pad10 bdWidth2 ">
            Contact List
          </h2>
          <div className="pad10">
            {contacts?.length > 0 ? (
              contacts.map((contact) => (
                <div key={contact.uid}>
                  <ContactDisplay contact={contact} receiverID={receiverId} setReceiverId={setReceiverId}/>
                </div>
              ))
            ) : (
              <div className="bigMidFont font bold700 fontColorMain ">
                No Contacts to display
              </div>
            )}
          </div>
        </div>
      </div>
    </PagesAndSide>
  );
};
