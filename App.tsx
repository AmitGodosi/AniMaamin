import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { store } from '@/services/store/store';
import { Provider } from 'react-redux';
import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'

import StackNavigator from '@/services/navigation/StackNavigator';

const queryClient = new QueryClient()

export default function App() {
	return (
		<>
			<StatusBar style='auto' />
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<NavigationContainer>
						<StackNavigator />
					</NavigationContainer>
				</Provider>
			</QueryClientProvider>
		</>
	);
}