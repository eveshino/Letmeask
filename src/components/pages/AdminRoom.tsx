import { useHistory, useParams } from "react-router-dom";

import deleteImg from "../../assets/images/delete.svg";
import logoImg from "../../assets/images/logo.svg";
import { Button } from "../Button";
import "../../styles/room.scss";

import { Question } from "../Question";
import { RoomCode } from "../RoomCode";

// import { useAuth } from "../../hooks/useAuth";

import { useRoom } from "../../hooks/useRoom";
import { database } from "../services/firebase";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  // const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Are you sure you want to delete")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="LetMeAsk" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar a sala
            </Button>
          </div>
        </div>
      </header>
      <main className="content">
        <div className="room-title">
          <h1>Rooms {title}</h1>
          {questions.length > 0 && <span>{questions.length} Question(s)</span>}
        </div>

        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remove Question" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
