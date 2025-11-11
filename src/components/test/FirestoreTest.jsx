import { useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Düzgün yolu yoxlayın

const FirestoreTest = () => {
  useEffect(() => {
    const testFirestore = async () => {
      try {
        const docRef = await addDoc(collection(db, "testCollection"), {
          name: "Test",
          createdAt: new Date(),
        });
        console.log("Sənəd uğurla əlavə edildi! ID:", docRef.id);
      } catch (error) {
        console.error("Firestore xətası:", error);
      }
    };

    testFirestore();
  }, []);

  return <div>Firestore test edilir...</div>;
};

export default FirestoreTest;
