hosts=( gignmix4.local gignmix3.local gignmix2.local gignmix1.local )

for i in ${hosts[@]}; do
    echo $i
    scp -r src pi@$i:/opt/radiodan/rde/apps/gignmix
done