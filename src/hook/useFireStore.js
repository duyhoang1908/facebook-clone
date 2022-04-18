import {
  onSnapshot,
  collection,
  where,
  query,
  orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const useFireStore = (collectionName, condition) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const collectionRef = query(
      collection(db, collectionName),
      orderBy("createAt"),
      where(condition.fieldName, condition.operator, condition.value)
    );

    const unsubcribed = onSnapshot(collectionRef, (querySnapshot) => {
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push(doc.data());
      });
      setData(documents);
    });

    return unsubcribed;
  }, [collection, condition]);

  return data;
};

export default useFireStore;
