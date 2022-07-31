/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Head from "next/head";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isLoginState, loginState, notesState } from "../atoms/LoginAtom";
import CardNotes from "../components/molecules/Card/CardNote";
import FormAddNote from "../components/molecules/Form/FormAddNote";
import Header from "../components/organisems/Header";
import { getNotes } from "../services/Notes";

function Home() {
  const [notes, setNotes] = useRecoilState(notesState);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

  const handleGetNotes = async () => {
    const res = await getNotes();
    console.log(res);
    setNotes(res.data);
  };

  useEffect(() => {
    handleGetNotes();
  }, [isLogin]);

  return (
    <div>
      <Head>
        <title>Note App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="App bg-slate-900 min-h-screen w-full text-white pb-20">
        <Header />
        <main className="flex flex-col items-center mt-10 gap-4">
          <div className="w-full mx-10 sm:mx-0 sm:w-6/12 bg-slate-800 py-4 px-6 rounded-md">
            <h1 className="font-semibold text-md mb-10">Buat Catatan</h1>
            <FormAddNote />
          </div>

          <div className="text-left w-10/12 py-4 flex flex-col items-center">
            <div className="text-left flex w-full">
              <h1 className="font-semibold text-xl mb-6">Catatan Aktif</h1>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-start gap-4 w-full ">
              {
              notes.map((note) => (
                <CardNotes key={note.id} note={note} />
              ))
              }

            </div>

            {/* <div className="w-full flex justify-center">
                <p>Tidak ada Catatan</p>
              </div> */}

          </div>

        </main>
      </div>
    </div>
  );
}

export default Home;
