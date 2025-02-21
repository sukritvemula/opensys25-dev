import { Link } from 'react-router-dom';

interface EventCardProps {
  title: string;
  level: string;
  duration: string;
  description: string;
  date: string;
  venue: string;
  team: string;
  prizes: string;
  registrationLink: string;
}

const EventCard = ({
  title,
  level,
  duration,
  description,
  date,
  venue,
  team,
  prizes,
  registrationLink,
}: EventCardProps) => {
  return (
    <div className="glass-card rounded-xl p-6 transform hover:scale-[1.02] transition-all duration-300 flex flex-col h-full">
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex items-start justify-between">
          <h3 className="text-2xl font-bold text-white font-clash max-w-[60%]">{title}</h3>
          <span className="bg-purple-500/20 text-purple-200 px-3 py-1 rounded-full text-xs font-sora whitespace-nowrap">
            Registration Open
          </span>
        </div>
        
        <div className="flex items-center gap-3 text-sm">
          <span className="bg-purple-900/30 text-purple-200 px-3 py-1 rounded-full">{level}</span>
          <span className="text-purple-300">•</span>
          <span className="text-purple-200">{duration}</span>
        </div>

        <p className="text-gray-300 text-sm leading-relaxed font-sora min-h-[80px]">{description}</p>
        
        <div className="space-y-2 text-sm font-sora mt-auto">
          <div className="flex items-center gap-2">
            <span className="text-purple-200">When:</span>
            <span className="text-gray-300">{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-200">Where:</span>
            <span className="text-gray-300">{venue}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-200">Team:</span>
            <span className="text-gray-300">{team}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-200">Prizes:</span>
            <span className="text-purple-300">{prizes}</span>
          </div>
        </div>

        <Link 
              to={registrationLink}
              className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-full transition-colors duration-200 text-sm font-medium font-sora text-center"
            >Registration Open</Link>
      </div>
    </div>
  );
};

export default EventCard;
