import { ScoreCardProps } from "../types/analysis";

export default function ScoreCard({
    score,
}: ScoreCardProps) {
    const scoreColor = () => {
        if (score >= 90) return "text-green-400";
        if (score >= 75) return "text-blue-400";
        if (score >= 60) return "text-yellow-400";

        return "text-red-400";
    };

    const badgeColor = () => {
        if (score >= 90) return "bg-green-600";
        if (score >= 75) return "bg-blue-600";
        if (score >= 60) return "bg-yellow-600";

        return "bg-red-600";
    };

    const quality = () => {
        if (score >= 90) return "Excellent";
        if (score >= 75) return "Good";
        if (score >= 60) return "Average";

        return "Needs Improvement";
    };

    return (
        <div className="space-y-8">

        {/* Overall Score */}

        <div className="bg-neutral-950 border border-gray-800 rounded-2xl p-8 text-center">

            <h2 className="text-xl font-semibold text-gray-400">
            Overall Design Score
            </h2>

            <h1
            className={`text-7xl font-bold mt-4 ${scoreColor()}`}
            >
            {score}
            </h1>

            <p className="mt-3 text-gray-400">
            out of 100
            </p>

        </div>

        {/* Quality Badge */}

        <div className="flex justify-center">

            <span
            className={`
                px-6
                py-3
                rounded-full
                font-bold
                text-white
                ${badgeColor()}
            `}
            >
            {quality()}
            </span>

        </div>

        </div>
    );
}