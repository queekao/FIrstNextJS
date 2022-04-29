import {useRouter} from "next/router";
import {useState, Fragment} from "react";
import Head from "next/head";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
const NewMeetupPage = () => {
  const path = useRouter();
  const [loading, setLoading] = useState(false);
  async function addMeetupHandler(enterData) {
    //instead of URL we can just indicate the folder route
    try {
      setLoading(true);
      if (loading) return <p>loading...</p>;
      const response = await fetch("/api/new-meetup", {
        method: "POST",
        body: JSON.stringify(enterData), //convert json
        headers: {"Content-Type": "application/json"},
      });
      const data = await response.json();
      console.log(data);
      // console.log(data);
      setLoading(false);
      path.push("/");
      // path.replace()//for we can go back
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <Fragment>
      <Head>
        <title>Your own meetups!!!</title>
        <meta
          name="description"
          content="Add new meetup and create amazing meetup!!"
        ></meta>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
};
export default NewMeetupPage;
