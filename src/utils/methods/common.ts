import crypto from 'crypto'

export function capitalize(word: string): string {
  return word && word.charAt(0).toUpperCase() + word.slice(1);
}

export function convertDateToInternation(dateString :string){
  const date: Date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
  const formattedDate: string = new Intl.DateTimeFormat('en-US', options).format(date);
  return formattedDate
}

interface ObjectStatus {
  status: string;
  timeRemaining: string;
}

export function formatTimeRemaining(milliseconds: number): string {
  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));

  let formattedTime = '';
  if (days > 0) {
      formattedTime += days + 'd ';
  }
  if (hours > 0) {
      formattedTime += hours + 'hr ';
  }
  if (minutes > 0) {
      formattedTime += minutes + 'min';
  }

  return formattedTime.trim();
}

export function getTimeStatus(campaignStart: string , campaignEnd: string ): ObjectStatus {
    const currentTime: Date = new Date();
    let campaignStartt = new Date(campaignStart);
    let campaignEndd = new Date(campaignEnd)

    let status: string;
    let timeRemaining: number;

    switch (true) {
        case currentTime < campaignStartt:
            status = "Starts";
            timeRemaining = campaignStartt.getTime() - currentTime.getTime();
            break;
        case campaignStartt <= currentTime && currentTime <= campaignEndd:
            status = "Ends";
            timeRemaining = campaignEndd.getTime() - currentTime.getTime();
            break;
        default:
            status = "Expired";
            timeRemaining = Math.abs(currentTime.getTime() - campaignEndd.getTime());
            break;
    }

    const formattedTimeRemaining = formatTimeRemaining(timeRemaining);

    return { status, timeRemaining: formattedTimeRemaining };
}

export const generateRandomHex = (num: number = 8): string => {
  return crypto.randomBytes(num).toString('hex');
};
