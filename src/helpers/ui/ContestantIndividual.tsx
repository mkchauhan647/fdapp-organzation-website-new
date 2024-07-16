import { Contestants, VotingStageCandidate } from "@/utils/schema/ApiInterface";
import React, { useEffect, useRef, useState } from "react";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../hooks/useStoreHooks";
import { CandidatesSlice } from "../redux/candidates/CandidatesSlice";
import {
  GetCandidatesByID,
  GetCandidatesByVotingCamapign,
} from "../redux/candidates/_thunks";
import Image from "next/image";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { AuthSlice } from "../redux/Auth/AuthSlice";
import { dataService } from "@/utils/data/api/dataServices";
import axios from "axios";
import { orgID } from "@/utils/constants/constants";
import CompetitionBox from "./CompetitionBox";
import ColorSelector from "./SelectColor";
import Link from "next/link";

const ContestantProfile: React.FC<{ params: string }> = ({ params }) => {
  const dispatch = useAppDispatch();
  const didMount = useRef(false);
  const { x_api_key } = useAppSelector((state: RootState) => state.Auth); // Access state.Auth
  const [xApiKeyFetched, setXApiKeyFetched] = useState(false);
  // Destructure contestant object

  async function getXApiKey() {
    // const response = await axios.get(`${process.env.NEXT_PUBLIC_VOTING_IDENTITY_URI}/x-api-key/${orgID}`);
    const response = await axios.get(
      "https://apiauth.easyvotingapp.com/v1/x-api-key/" + orgID
    );
    const x_api_key = response?.data.data.token;
    dispatch(AuthSlice.actions.setXApiKey(x_api_key));
    dataService.setApiKey(x_api_key);
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!didMount.current) {
        didMount.current = true;
        if (!x_api_key) {
          try {
            await getXApiKey();
            setXApiKeyFetched(true);
            dispatch(GetCandidatesByID(params));
          } catch (error) {}
        } else {
          dataService.setApiKey(x_api_key);
          setXApiKeyFetched(true);
          dispatch(GetCandidatesByID(params));
        }
      }
    };

    fetchData();
  }, [xApiKeyFetched]);

  const { candidates_by_id_data } = useAppSelector(
    (state: RootState) => state.Candidates
  );
  const { fulfilledResponse } = candidates_by_id_data;
  const contestant: Contestants = fulfilledResponse?.data;

  const handelChange = () => {};

  return (
    <>
      {contestant && (
        <section className="Candidate-Individulal -has-candidate-info -is-valid-by-id">
          {/* <nav className='py-[1rem] border-b-2 border-[var(--border-color)]'>
              <div className="container mx-auto">
                Nav bar
              </div>
            </nav> */}
          <div className="container mx-auto">
            {/* <div className="flex flex-col gap-5 mx-auto">
                  <div className="flex gap-3 items-center">
                      <div className="h-[8rem] w-[8rem] rounded-lg">
                          <Image src={process.env.NEXT_PUBLIC_AWS_URI + contestant.profilePicture} height={300} width={300} alt="profile" 
                          className="h-full w-full rounded-full object-cover" 
                          />
                      </div>
                      <div>
                          <h1 className="card-title-blue">{contestant.name}</h1>
                          <p className="text-xl font-[500] text-[var(--light)]">{contestant.votingCampaign.title.split(' ').at(0)} | {contestant.code}</p>
                      </div>
                  </div>

                  <div>
                      <p className="profile-topic">About</p>
                      <p className="text-sm font-[500] text-[var(--light)] text-left">
                          {contestant.biography}
                      </p>

                  </div>

                  <div>
                      <p className="profile-topic">Competition</p>
                      <p className="text-sm font-[500] text-[var(--light)] text-left">
                          {contestant.votingCampaign.title}
                      </p>

                  </div>

                  <div>
                      <p className="profile-topic">Additional Information</p>
                      <div className="flex flex-wrap items-center gap-2">
                          <div className="contestant-info-box"><p className="text-[13px] ">{contestant.nationality}</p></div>
                          <div className="contestant-info-box"><p className="text-[13px] ">{contestant.city}</p></div>
                          <div className="contestant-info-box"><p className="text-[13px] ">{contestant.gender}</p></div>
                          <div className="contestant-info-box"><p className="text-[13px] ">{contestant.weight} lbs</p></div>
                          <div className="contestant-info-box"><p className="text-[13px] ">{contestant.age} Years Old</p></div>
                      </div>
                  </div>
                  <div>
                      <p className="profile-topic">Social Media</p>
                      <div className="flex items-center gap-4 text-xl text-[var(--blue)]">
                          {contestant.socialMediaFacebook && <Link href={contestant.socialMediaFacebook} target='_blank'> <FaFacebook /></Link> }
                          {contestant.socialMediaInstagram && <Link href={contestant.socialMediaInstagram} target='_blank'> <FaInstagram /></Link> }
                          {contestant.socialMediaInstagram && <Link href={contestant.socialMediaInstagram} target='_blank'> <FaXTwitter /></Link> }
                      </div>
                  </div>
              </div> */}

            <div className="flex md:flex-row flex-col gap-[1.5rem] py-[2rem] relative">
              <div className="w-[25%] sticky top-[7vh] h-fit">
                <div className="w-full h-[80vh] rounded-md overflow-hidden">
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_AWS_URI +
                      contestant.profilePicture
                    }
                    height={900}
                    width={900}
                    alt="profile"
                    className="w-full object-cover object-top"
                  />
                  <Dropdown>
                    <DropdownTrigger>
                      <Button className="bg-[var(--c-secondary)] mt-4 text-[#fff]">
                        Vote Now
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Dynamic Actions"
                      items={contestant.votingStageCandidates}
                    >
                      {(item) => (
                        <DropdownItem key={item.id}>
                          <Link
                            href={`/campaign/category/details?id=${item.votingCampaignStage.id}&campaignId=${contestant.votingCampaignId}`}
                          >
                            {item.votingCampaignStage.title}
                          </Link>
                        </DropdownItem>
                      )}
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>

              <div className="w-[75%] shadow-lg border-1 border-[var(--border-color)] rounded-md py-[1.5em] px-[1.5rem] flex flex-col gap-[1rem]">
                <header>
                  <h1 className="text-[2rem] font-[600] text-[var(--black)] font-poppins">
                    Profile
                  </h1>
                </header>

                <div className="flex flex-col gap-[2rem] w-full">
                  <section className="grid grid-cols-3 gap-[1rem] gap-y-[1.5rem]">
                    <div className="profile-input-box">
                      <label className="contestant-profile-title">
                        Full Name
                      </label>
                      <p className="contestant-profile-info">
                        {contestant.name}
                      </p>
                    </div>

                    <div className="profile-input-box">
                      <label className="contestant-profile-title">Age</label>
                      <p className="contestant-profile-info">
                        {contestant.age}
                      </p>
                    </div>

                    <div className="profile-input-box">
                      <label className="contestant-profile-title">
                        Place Of Birth
                      </label>
                      <p className="contestant-profile-info">
                        {contestant.city}
                      </p>
                    </div>

                    <div className="profile-input-box">
                      <label className="contestant-profile-title">
                        Email Address
                      </label>
                      <p className="contestant-profile-info">
                        info@example.com
                      </p>
                    </div>

                    <div className="profile-input-box">
                      <label className="contestant-profile-title">
                        Nationality
                      </label>
                      <p className="contestant-profile-info">
                        {contestant.nationality}
                      </p>
                    </div>

                    <div className="profile-input-box">
                      <label className="contestant-profile-title">
                        Hometown
                      </label>
                      <p className="contestant-profile-info">
                        {contestant.city}
                      </p>
                    </div>
                  </section>

                  <section>
                    <div className="profile-input-box">
                      <label className="contestant-profile-title">
                        About Me
                      </label>
                      <p className="contestant-profile-info">
                        {contestant.biography}
                      </p>
                    </div>
                  </section>

                  <section className="grid grid-cols-2 gap-[1rem]">
                    <div className="profile-input-box">
                      <label className="contestant-profile-title">
                        Eye Color
                      </label>
                      <ColorSelector
                        color={"#130102"}
                        colorlist={["#220202", "#130101", "#130102", "#13394F"]}
                      />
                    </div>

                    <div className="profile-input-box">
                      <label className="contestant-profile-title">
                        Hair Color
                      </label>
                      <ColorSelector
                        color={"#13394F"}
                        colorlist={["#220202", "#130101", "#130102", "#13394F"]}
                      />
                    </div>
                  </section>

                  <section>
                    <div className="profile-input-box">
                      <label className="contestant-profile-title">Height</label>
                      <div className="bg-[var(--pagebg1)] px-[2rem] py-[2rem] rounded-md">
                        <input
                          className="profile-height-range mx-auto w-full"
                          type="range"
                          max={7}
                          value={5}
                        />
                      </div>
                    </div>
                  </section>

                  <section>
                    <div className="flex flex-col gap-[1rem]">
                      <div>
                        <label className="contestant-profile-title">
                          Native Language
                        </label>
                        <p className="contestant-profile-info">English</p>
                      </div>

                      <div>
                        <label className="contestant-profile-title">
                          Additional Language
                        </label>
                        <ul>
                          <li>English</li>
                          <li>Nepali</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section className="h-fit w-full ">
                    <h1 className="contestant-profile-topic">Photo Gallery</h1>
                    <div className="overflow-auto profile-image-slider">
                      <div className="flex gap-[1rem] w-[110rem] py-[1rem]">
                        {Array.from({ length: 8 }).map((_, index) => {
                          return (
                            <div
                              key={index}
                              className="h-[15rem] w-[25rem] rounded-md overflow-hidden"
                            >
                              <Image
                                src="/image/dymmy-profile.jpg"
                                height={500}
                                width={900}
                                alt="profile"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </section>

                  <section>
                    <div>
                      <h1 className="contestant-profile-topic">Education</h1>

                      <div className="grid grid-cols-3 gap-[1rem]">
                        <div className="profile-input-box">
                          <label className="contestant-profile-title">
                            Education Level
                          </label>
                          <p className="contestant-profile-info">Bachelor</p>
                        </div>
                        <div className="profile-input-box">
                          <label className="contestant-profile-title">
                            Collage / University
                          </label>
                          <p className="contestant-profile-info">
                            ABC University
                          </p>
                        </div>
                        <div className="profile-input-box">
                          <label className="contestant-profile-title">
                            Major Study
                          </label>
                          <p className="contestant-profile-info">
                            Computer Science
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section>
                    <div className="profile-input-box">
                      <label className="contestant-profile-title">
                        Academic Achievement
                      </label>

                      <div className="flex gap-[1rem] border-2 border-var(--border-color) px-[1rem] py-[1rem] rounded-md">
                        <div className="border-1 border-[var(--grey)] bg-[var(--light-text-color2)] px-[1.3rem] py-[.1rem] rounded-[2rem]">
                          Achievement 1
                        </div>
                        <div className="border-1 border-[var(--grey)] bg-[var(--light-text-color2)] px-[1.3rem] py-[.1rem] rounded-[2rem]">
                          Achievement 2
                        </div>
                        <div className="border-1 border-[var(--grey)] bg-[var(--light-text-color2)] px-[1.3rem] py-[.1rem] rounded-[2rem]">
                          Achievement 3
                        </div>
                      </div>
                    </div>
                  </section>

                  <div className="profile-input-box">
                    <h1 className="contestant-profile-topic">Vote in</h1>
                    <div className="flex flex-wrap">
                      {contestant.votingStageCandidates.map(
                        (
                          stageCandidate: VotingStageCandidate,
                          index: number
                        ) => {
                          return (
                            <div className="w-full md:w-1/3" key={index}>
                              <CompetitionBox
                                link={`/campaign/category/details?id=${stageCandidate.votingCampaignStage.id}&campaignId=${contestant.votingCampaignId}`}
                                title={stageCandidate.votingCampaignStage.title}
                                logo={stageCandidate.votingCampaignStage.logo}
                                startDateTime={
                                  stageCandidate.votingCampaignStage
                                    .startDateTime
                                }
                                endDateTime={
                                  stageCandidate.votingCampaignStage.endDateTime
                                }
                              />
                            </div>
                          );
                        }
                      )}
                      {contestant.votingStageCandidates.length === 0 && (
                        <p className="contestant-profile-info">
                          Contestant is not enrolled into any voting stages
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {!contestant && "Requested contestant do not exist"}
    </>
  );
};

export default ContestantProfile;
