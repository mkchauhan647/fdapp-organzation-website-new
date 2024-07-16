import { RootState, useAppDispatch, useAppSelector } from '@/helpers/hooks/useStoreHooks'
import { Contestants, VotingCampaign, VotingCampaignStage } from '@/utils/schema/ApiInterface'
import Link from 'next/link'
import React, { MouseEvent, useEffect, useState } from 'react'
import { IoClose, IoSearch } from 'react-icons/io5'

const  SearchBar : React.FC = () => {
  const [isOpen , setIsOpen] = useState<boolean>(false);
  const [searchTerm , setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]); // Holds search results

  const {all_campaign_data} = useAppSelector((state : RootState )=> state.VotingCampaign )
  const {all_campaign_stages_Data } = useAppSelector((state : RootState )=> state.VotingCampaignStages )
  const { all_candidates_data } = useAppSelector((state : RootState )=> state.Candidates )

  const campaigns: VotingCampaign[] = all_campaign_data.fulfilledResponse?.data?.rows || [];
  const campaignStages: VotingCampaignStage[] = all_campaign_stages_Data.fulfilledResponse?.data || [];
  const candidates: Contestants[] = all_candidates_data.fulfilledResponse?.data?.rows || [];
  
  // Function to filter search results
  const filterSearchResults = () => {
    const campaignResults = campaigns.filter(campaign => campaign.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const stageResults = campaignStages.filter(stage => stage.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const candidateResults = candidates.filter(candidate => candidate.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    
    const campaignResultsWithType = campaignResults.map(result => ({ ...result, type: 'campaign' }));
    const stageResultsWithType = stageResults.map(result => ({ ...result, type: 'campaignStage' }));
    const candidateResultsWithType = candidateResults.map(result => ({ ...result, type: 'candidate' }));
    
    console.log(searchResults)
    setSearchResults([...campaignResultsWithType, ...stageResultsWithType, ...candidateResultsWithType]);
  }

  function handleToggle() : void {
    setIsOpen((prev) => !prev)
  }

  
  useEffect(() => {
    const keys = {37: 1, 38: 1, 39: 1, 40: 1};

    function preventDefault(e: Event) {
        e.preventDefault();
    }

    function preventDefaultForScrollKeys(e: KeyboardEvent) {
        if (keys.hasOwnProperty(e.keyCode)) {
            preventDefault(e);
            return false;
        }
    }

    function disableScroll() {
        window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
        window.addEventListener('wheel', preventDefault, wheelOpt as any); // modern desktop
        window.addEventListener('mousewheel', preventDefault, wheelOpt as any); // older browsers
        window.addEventListener('touchmove', preventDefault, wheelOpt as any); // mobile
        window.addEventListener('keydown', preventDefaultForScrollKeys, false);
    }

    function enableScroll() {
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.removeEventListener('wheel', preventDefault, wheelOpt as any);
        window.removeEventListener('mousewheel', preventDefault, wheelOpt as any);
        window.removeEventListener('touchmove', preventDefault, wheelOpt as any);
        window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
    }

    const supportsPassive = (() => {
        let supportsPassive = false;
        try {
            window.addEventListener("test" as keyof WindowEventMap, null as any, Object.defineProperty({}, 'passive', {
                get: function () { supportsPassive = true; }
            }));
        } catch (e) {}
        return supportsPassive;
    })();

    const wheelOpt: boolean | { passive: boolean } = supportsPassive ? { passive: false } : false;

    if (isOpen) {
        disableScroll();
    } else {
        enableScroll();
    }

    return () => {
        enableScroll(); // Always make sure to enable scrolling when the component unmounts
    };
}, [isOpen]);





  return (
    <div className={`search-box ${isOpen ? 'relative active' : ''} relative `}>
      <input 
        className="search-text bg-[var(--c-grey)]" 
        type="text" 
        placeholder="Search Anything" 
        value={searchTerm} 
        onChange={(e)=> {
          setSearchTerm(e.target.value);
          filterSearchResults(); // Call filter function on change
        }}
      />
      {/* Display dropdown only if there are search results */}
      {searchResults.length > 0 && (
        <ul className="search-results hidden absolute top-12 w-full bg-white rounded-lg shadow-lg z-10 h-48 overflow-y-auto text-black">
          {searchResults.map((result, index) => (
            <li key={index} className="search-result p-2 hover:bg-gray-200 cursor-pointer">
              {result.hasOwnProperty('title') && 
                <Link href={result.type == 'campaign' ? `/campaign/${result.id}` : `/campaign/category/details?id=${result.id}&campaignId=${result.votingCampaignId}`}>{result.title}</Link>}
              {result.hasOwnProperty('name') && 
                <Link href={`/contestants/${result.id}?name=${result.name}&camapignId=${result.votingCampaignId}`}>{result.name}</Link>}
            </li>
          ))}
        </ul>
      )}
      <button className="ml-2 search-btn" onClick={handleToggle}>
        {
          isOpen ? 
          <IoClose className='text-xl text-[var(--c-grey)] w-[20px] h-[20px] md:w-[20px] md:h-[20px]' title='close searchbar'/> :
          <IoSearch className='text-xl text-[var(--c-grey)] w-[20px] h-[20px] md:w-[20px] md:h-[20px]' title='open searchbar'/> 
        }
      </button>
    </div>
  );
}

export default SearchBar;
