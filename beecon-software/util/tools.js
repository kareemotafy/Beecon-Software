import { onValue, ref, update } from "firebase/database";
import { rtdbClient } from "./firebase";

const convertToDb = (reading, reference = 1) => {
  return 20 * Math.log10(reading / reference).toPrecision(2);
};

const watchValue = (
  watchValue,
  setter,
  { path, skipPath } = { path: "sensorData", skipPath: false }
) => {
  const watchRef = ref(rtdbClient, watchValue);
  onValue(watchRef, (snapshot) => {
    const data = snapshot.val();
    skipPath ? setter(data) : setter(data?.[path]);
  });
};

const updateValue = async (updateValue, newValue) => {
  const watchRef = ref(rtdbClient);
  await update(watchRef, { [updateValue]: newValue });
};

export { convertToDb, watchValue, updateValue };
