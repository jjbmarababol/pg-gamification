import { useState, useEffect } from "react";
import { firebase } from "../firebase";

export interface Player {
	name: string;
	docId: string;
	channelId: string;
	coins: number;
	contributions: number;
}

export const usePlayers = () => {
	const [players, setPlayers] = useState<Player[]>();

	useEffect(() => {
		const unsubscribe = firebase
			.firestore()
			.collection("players")
			.where("channelId", "==", "")
			.orderBy("name")
			.onSnapshot((snapshot) => {
				const allPlayers = snapshot.docs.map((channel) => {
					const { name, channelId, coins, contributions } = channel.data();
					return {
						name,
						channelId,
						coins,
						contributions,
						docId: channel.id,
					};
				});

				if (JSON.stringify(allPlayers) !== JSON.stringify(players)) {
					setPlayers(allPlayers);
				}
			});

		return () => {
			unsubscribe();
		};
	});

	return { players, setPlayers };
};

export const addPlayer = async (playerName: string) => {
	return await firebase
		.firestore()
		.collection("players")
		.add({
			name: playerName,
			coins: 0,
			contributions: 0,
			channelId: "",
		});
};

export const deletePlayer = async (playerId: string) => {
	return await firebase
		.firestore()
		.collection("players")
		.doc(playerId)
		.delete()
		.then(() => {
			console.log("Deleted Successfully");
		})
		.catch((e) => {
			console.error("Error: ", e);
		});
};
