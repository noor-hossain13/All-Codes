
#include <bits/stdc++.h>
using namespace std;

int main() {
	ios::sync_with_stdio(false);
	cin.tie(nullptr);

	int T;
	if (!(cin >> T)) return 0;
	for (int tc = 1; tc <= T; ++tc) {
		int N;
		cin >> N;
		vector<long long> A(N);
		for (int i = 0; i < N; ++i) cin >> A[i];

		vector<long long> prefmax(N), sufmin(N);
		for (int i = 0; i < N; ++i) {
			if (i == 0) prefmax[i] = A[i]; else prefmax[i] = max(prefmax[i-1], A[i]);
		}
		for (int i = N-1; i >= 0; --i) {
			if (i == N-1) sufmin[i] = A[i]; else sufmin[i] = min(sufmin[i+1], A[i]);
		}

		int answer = -1;
		for (int i = 0; i < N; ++i) {
			bool taller_than_front = (i == 0) || (A[i] > prefmax[i-1]);
			bool shorter_than_back = (i == N-1) || (A[i] < sufmin[i+1]);
			if (taller_than_front && shorter_than_back) { answer = i + 1; break; }
		}

		cout << "Case " << tc << ": ";
		if (answer == -1) cout << "Humanity is doomed!";
		else cout << answer;
		if (tc < T) cout << '\n';
	}

	return 0;
}

